import db from 'db';
import { Controller } from './types';

const create: Controller = async (ctx) => {
  const { context, pic, author, tags } = ctx.request.body;
  const man = await db.posts
    .findOne({ context: context, pic: pic, author: author })
    .exec();
  if (man) {
    ctx.status = 403;
  } else {
    const item = await db.posts.create({
      context,
      pic,
      author,
    });
    const id = item._id;
    const put = tags.forEach(async function (e: String) {
      await db.posts.updateOne({ _id: id }, { $push: { tags: e } });
    });
    ctx.status = 200;
  }
};

const update: Controller = (ctx) => {
  //   const { email, password } = ctx.request.body;

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
