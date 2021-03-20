import db from 'db';
import { Controller } from './types';
const crypto = require('crypto');
import generateToken from 'utils/jwt';
import upload, { remove } from '../utils/s3';
import sharp from 'sharp';
import fetch from 'node-fetch';
var ObjectId = require('mongoose').Types.ObjectId;

const { PassThrough } = require('stream');

const hash = (_password: any) => {
  return crypto
    .createHash('sha256', process.env.SECRET_KEY)
    .update(_password)
    .digest('hex');
};

const login: Controller = async (ctx) => {
  const { code } = ctx.request.body;
  let payload = {};
  const client_id = '15ee5ed91fe2db70dd5cb824065507c6';
  const promise1 = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&client_id=${client_id}&redirect_uri=http://byker.s3-website.ap-northeast-2.amazonaws.com/&code=${code}`,
  });
  const json1 = await promise1.json();

  const promise2 = fetch('https://kapi.kakao.com/v2/user/me', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${json1.access_token}`,
      'Content-type': 'application/x-www-form-urlencoded',
    },
  });
  const json2 = await (await promise2).json();
  const man: any = await db.users.findOne({
    email: json2.kakao_account.email,
  });

  if (man) {
    const token = await generateToken({
      _id: man._id,
      email: man.email,
    });

    const payload2 = {
      _id: man._id,
      token,
      email: man.email,
      name: man.name,
      exp: man.exp,
      profilepic: man.profilepic,
    };
    payload = payload2;
  } else {
    const newuser: any = await db.users.create({
      email: json2.kakao_account.email,
      name: json2.properties.nickname,
      profilepic: json2.thumbnail_image,
    });
    const token = await generateToken({
      _id: newuser._id,
      email: newuser.email,
    });

    const payload3 = {
      _id: newuser._id,
      token,
      email: newuser.email,
      name: newuser.name,
      exp: newuser.exp,
      profilepic: newuser.profilepic,
    };
    payload = payload3;
  }
  console.log(payload, 'zzzz');
  ctx.body = payload;
  ctx.status = 200;
};

const update: Controller = async (ctx) => {
  const { email, password, name, cell, memo } = ctx.request.body;
  let user;
  if (password) {
    var hashed = hash(password);
    user = await db.users.findOneAndUpdate(
      { email },
      { password: hashed, name, cell, memo },
      { new: true }
    );
  } else {
    user = await db.users.findOneAndUpdate(
      { email },
      { name, cell, memo },
      { new: true }
    );
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
  const body = sharp(path).resize(60, 60).png();

  const ret: any = await remove({
    Bucket: 'ridasprod',
    Key: user.profilepic.substr(user.profilepic.indexOf('profileimage')),
  });

  const param = {
    Bucket: 'ridasprod',
    Key: `profileimage/${user._id}_${new Date().getTime()}`,
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
  const posts = await db.posts
    .find({ author: ObjectId(userid) })
    .populate('author')
    .exec();
  const jobs = await db.jobs
    .find({ author: ObjectId(userid) })
    .populate('author')
    .exec();
  const markets = await db.markets
    .find({ author: ObjectId(userid) })
    .populate('author')
    .exec();
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
  login,
  update,
  deleteone,
  findone,
  userprofile,
  logout,
  uploadProfile,
};
