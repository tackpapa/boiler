import db from 'db';
import { Controller } from './types';
const crypto = require('crypto');
import jwt from 'koa-jwt';
import { Joi } from 'koa-joi-router';

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
    return (ctx.status = 403);
  } else {
    const hashed = hash(password);
    const man = await db.users.findOne({ email }).exec();
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
      const user1 = await db.users
        .findOne({
          email,
        })
        .exec();
      ctx.body = user1;
      console.log('user created', ctx.request.body);
    }
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
    // 이메일로 계정 찾기
    user = await db.users.findOne({ email });
  } catch (e) {
    ctx.throw(500, e);
  }
  if (!user || user.password !== `${hashed}`) {
    // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
    ctx.status = 403; // Forbidden
    return;
  } else {
    ctx.status = 200;
    console.log('logging in', user.email);
    return (ctx.status = 200);
  }
};

const update: Controller = async (ctx) => {
  const { email, password, name, cell } = ctx.request.body;
  const hashed = hash(password);
  const man = await db.users
    .findOneAndUpdate({ email, password, name, cell })
    .exec();
  // const updated = await db.users.findOne({ email }).exec();
  // console.log('updated', updated);  업뎃됬는지 확인용 코드
  ctx.status = 200;
};

const deleteone: Controller = async (ctx) => {
  const { email, password } = ctx.request.body;
  await login(ctx);
  if (ctx.status === 200) {
    const del = db.users.deleteOne({ email });
    ctx.status === 200;
    console.log(email, ' user deleted');
  } else {
    console.log('user already gone');
  }
};

const findone: Controller = async (ctx) => {
  const { id } = ctx.params;
  console.log('요기까지', ctx.params.id);
  const user = await db.users.findOne({ _id: id });
  ctx.status = 200;
  ctx.body = user;
};

const logout: Controller = async (ctx) => {
  const { email, password } = ctx.request.body;
};

export default { create, login, update, deleteone, findone, logout };
