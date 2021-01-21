import db from 'db';
import { Controller } from './types';

const home: Controller = async (ctx) => {
  ctx.status = 200;
  ctx.body = 'sdfsdfsdfsdfsdf';
};

export default { home };
