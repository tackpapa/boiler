import db from 'db';
import { Controller } from './types';
import upload, { remove } from '../utils/s3';
import fs from 'fs';

const home: Controller = async (ctx) => {
  const allbanner = await db.banners.find();
  ctx.body = allbanner;
};

const getbanner: Controller = async (ctx) => {
  const { category } = ctx.params;
  const banners = await db.banners
    .find({ category: category })
    .sort({ _id: -1 })
    .limit(20);
  ctx.body = banners;
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
  ctx.body = item;
};

const deleteone: Controller = async (ctx) => {
  const id = ctx.params.id;
  const banner: any = await db.banners.findOne({ _id: id });
  if (banner.pic) {
    const ret: any = await remove({
      Bucket: 'ridasprod',
      Key: banner.pic.substr(banner.pic.indexOf('banners')),
    });
  }

  const del = await db.banners.findOneAndDelete({
    _id: id,
  });

  ctx.status = 200;
  ctx.body = id;
};

export default { home, create, deleteone, getbanner };
