import Koa from 'koa';
import bodyParser from 'koa-body';
import cors from '@koa/cors';
import koaHelmet from 'koa-helmet';
import router from './router/route';
import dotenv from 'dotenv';
import path from 'path';
import { jwtParser } from 'utils/jwt';
import http from 'http';

const winston = require('winston');
const { logger } = require('koa2-winston');

dotenv.config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const app = new Koa();

app
  .use(cors())
  .use(jwtParser)
  .use(
    logger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
      ],
    })
  )
  .use(
    bodyParser({
      multipart: true,
      formidable: { maxFileSize: 10 * 1024 * 1024 },
    })
  )
  .use(router.allowedMethods())
  .use(koaHelmet())
  .use(router.routes());

function Listening() {
  console.log(`♥️♥️♥️♥️♥️  Lawyer listening now at port`, process.env.PORT);
}
const server = http.createServer(app.callback());
server.listen(process.env.PORT, Listening);
