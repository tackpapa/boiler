import db from 'db';
import { Controller } from './types';

const create: Controller = (ctx) => {
  console.log(ctx.request.body);
  const {
    context,
    pic,
    author,
    tags: [],
  } = ctx.request.body;
  db.posts.create({
    context,
    pic,
    author,
    tags: [],
  });

  ctx.status = 200;
};

const update: Controller = (ctx) => {
  const { email, password } = ctx.request.body;
  db.users.create({
    email,
    password,
  });

  ctx.body = 'hello world';
};

const findone: Controller = (ctx) => {
  const { email, password } = ctx.request.body;
  db.users.create({
    email,
    password,
  });

  ctx.body = 'hello world';
};

const findall: Controller = (ctx) => {
  const { email, password } = ctx.request.body;
  db.users.create({
    email,
    password,
  });

  ctx.body = 'hello world';
};

const deleteone: Controller = (ctx) => {
  const { email, password } = ctx.request.body;
  db.users.create({
    email,
    password,
  });

  ctx.body = 'hello world';
};

export default { create, deleteone, update, findone, findall };
