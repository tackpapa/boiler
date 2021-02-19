import db from 'db';
import { Controller } from './types';
const crypto = require('crypto');
import { Joi } from 'koa-joi-router';
import generateToken from 'utils/jwt';
import upload from '../utils/s3';
import fs from 'fs';
import sharp from 'sharp';
var ObjectId = require('mongoose').Types.ObjectId;

const { PassThrough } = require('stream');

const hash = (_password: any) => {
  return crypto
    .createHash('sha256', process.env.SECRET_KEY)
    .update(_password)
    .digest('hex');
};

const create: Controller = async (ctx) => {
  const { email, password, name, cell } = ctx.request.body;
  var pattern = /\S+@\S+\.\S+/;
  const emailVal = pattern.test(email);
  if (emailVal === false) {
    ctx.status = 401;
    return;
  }
  const hashed = hash(password);
  const man = await db.users.findOne({ email });
  if (man) {
    ctx.status = 403;
  } else {
    await db.users.create({
      email,
      password: hashed,
      name,
      cell,
    });
    ctx.status = 200;
    const user1 = await db.users.findOne({
      email,
    });
    ctx.body = user1;
  }
};

const login: Controller = async (ctx) => {
  const { email, password } = ctx.request.body;
  const hashed = hash(password);
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  schema
    .validateAsync({ email, password })
    .then((result) => {
      ctx.request.body = result;
    })
    .catch((err) => {
      throw new Error('Failed to validate input ' + err.details[0].message);
    });
  let user: any = null;
  try {
    user = await db.users.findOne({ email });
  } catch (e) {
    ctx.throw(500, e);
  }
  if (!user || user.password !== `${hashed}`) {
    ctx.status = 403; // Forbidden
    return;
  }
  ctx.status = 200;
  const token = await generateToken({ _id: user.id, email: user.email });
  ctx.body = {
    _id: user.id,
    token,
    email,
    name: user.name,
    exp: user.exp,
    profilepic: user.profilepic,
  };
  return;
};

const update: Controller = async (ctx) => {
  const { email, password, name, cell, memo } = ctx.request.body;
  let user;
  if (password) {
    var hashed = hash(password);
    user = await db.users.findOneAndUpdate(
      { email },
      { password: hashed, name, cell, memo }
    );
  } else {
    user = await db.users.findOneAndUpdate({ email }, { name, cell, memo });
  }
  ctx.status = 200;
  ctx.body = user;
};

const deleteone: Controller = async (ctx) => {
  const { _id } = ctx.request.body;
  await login(ctx);
  if (ctx.status === 200) {
    db.users.deleteOne({ _id });
  } else {
    console.error;
  }
  ctx.body = 'deleted;';
  ctx.status = 200;
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const user = await db.users.findOne({ _id: id });
  ctx.status = 200;
  ctx.body = user;
};

const uploadProfile: Controller = async (ctx) => {
  const user: any = await db.users.findOne({ _id: ctx.state.user._id });
  const { path } = ctx.request.files.pic;
  console.log({ path }, 'zzsdfkjsdhfjkshdjfkhksj');
  const body = sharp(path).resize(60, 60).png();
  const param = {
    Bucket: 'ridasprod',
    Key: `profileimage/${user._id}`,
    ACL: 'public-read',
    Body: body.pipe(PassThrough()),
    ContentType: 'image/png',
  };
  const up = await upload(param);
  (user as any).profilepic = up.Location;
  user.save();
  ctx.status = 200;
  ctx.body = user;
};

const userprofile: Controller = async (ctx) => {
  const userid = ctx.state.user._id;
  const posts = await db.posts.find({ author: ObjectId(userid) }).exec();
  const jobs = await db.jobs.find({ author: ObjectId(userid) }).exec();
  const markets = await db.markets.find({ author: ObjectId(userid) }).exec();
  ctx.status = 200;
  ctx.body = {
    post: posts,
    job: jobs,
    market: markets,
  };
};

const logout: Controller = (ctx) => {
  ctx.status = 200;
};

export default {
  create,
  login,
  update,
  deleteone,
  findone,
  userprofile,
  logout,
  uploadProfile,
};
