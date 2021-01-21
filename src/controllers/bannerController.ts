import db from 'db';
import { Controller } from './types';
import upload from '../utils/s3';
import fs from 'fs';

const home: Controller = async (ctx) => {
  const allbanner = await db.banners.find();
  ctx.body = allbanner;
};

const create: Controller = async (ctx) => {
  const { title, category, link } = ctx.request.body;
  const item = await db.banners.create({
    title,
    category,
    link,
  });
  const param = {
    Bucket: 'ridasprod',
    Key: `banners/${item._id + Math.random()}`,
    ACL: 'public-read',
    Body: await fs.createReadStream(ctx.request.files.pic.path),
    ContentType: 'image/png',
  };
  const lala = await upload(param);
  (item as any).pic = lala.Location;
  item.save();
  ctx.status = 200;
};

const deleteone: Controller = async (ctx) => {
  const id = ctx.params.id;
  const del = await db.banners.findOneAndDelete({
    _id: id,
  });
  ctx.status = 200;
};

export default { home, create, deleteone };
