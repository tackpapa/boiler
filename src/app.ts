import Koa from 'Koa';
import bodyParser from 'koa-body';
import koaCors from 'koa-cors';
import koaHelmet from 'koa-helmet';
import router from './router/route';
import dotenv from 'dotenv';
import path from 'path';
import { jwtParser } from 'utils/jwt';
import socket from './socket';
import http from 'http';

dotenv.config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const app = new Koa();

app
  .use(jwtParser)
  .use(bodyParser({ multipart: true, formidable: {} }))
  .use(router.allowedMethods())
  .use(koaHelmet())
  .use(koaCors())
  .use(router.routes());

function Listening() {
  console.log(`♥️♥️♥️♥️♥️  listening now at port`, process.env.PORT);
}
const server = http.createServer(app.callback());
socket(server);
server.listen(process.env.PORT, Listening);

// 채팅세션, 노티피케이션클라, , 몽고레플리카설정 마스터 슬레이브,
