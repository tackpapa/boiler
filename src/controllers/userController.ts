import db from 'db';
import { Controller } from './types';
const crypto = require('crypto');
import { Joi } from 'koa-joi-router';
import generateToken from 'utils/jwt';
import upload from '../utils/s3';
import fs from 'fs';
import jwt from 'jsonwebtoken';

const hash: Controller = (_password: any) => {
  return crypto
    .createHash('sha256', process.env.SECRET_KEY)
    .update(_password)
    .digest('hex');
};

const validatePassword = function (password: any) {
  const hashed = hash(password);
  return hashed;
};

const create: Controller = async (ctx) => {
  const { email, password, name, cell } = ctx.request.body;
  var pattern = /\S+@\S+\.\S+/;
  const emailVal = pattern.test(email);
  if (emailVal === false) {
    ctx.status = 400;
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
    // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
    ctx.status = 403; // Forbidden
    return;
  }
  ctx.status = 200;
  const token = await generateToken({ _id: user.id, email: user.email });
  ctx.body = token;
  return;
};

const update: Controller = async (ctx) => {
  const { email, password, name, cell } = ctx.request.body;
  const hashed = hash(password);
  await db.users.findOneAndUpdate({ email }, { password: hashed, name, cell });
  ctx.status = 200;
};

const deleteone: Controller = async (ctx) => {
  const { email } = ctx.request.body;
  await login(ctx);
  if (ctx.status === 200) {
    db.users.deleteOne({ email });
    console.log(email, ' user deleted');
  } else {
    console.log('user already gone');
  }
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  const user = await db.users.findOne({ _id: id });
  ctx.status = 200;
  ctx.body = user;
};

const uploadProfile: Controller = async (ctx) => {
  const user: any = await db.users.findOne({ _id: ctx.state.user._id });
  const { path } = ctx.request.files.profilepic;
  const body = fs.createReadStream(path);
  const param = {
    Bucket: process.env.pjt_name,
    Key: `image/${user._id}`,
    ACL: 'public-read',
    Body: body,
    ContentType: 'image/png',
  };
  const up = await upload(param);
  (user as any).profilepic = up.Location;
  user.save();
  ctx.status = 200;
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
  logout,
  uploadProfile,
};
