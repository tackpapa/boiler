const Koa = require('koa');
const bodyParser = require('koa-body');
const koaCors = require('koa-cors');
const koaHelmet = require('koa-helmet');
import router from './router/route';
const dotenv = require('dotenv');
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
  .use(bodyParser({ multipart: true, formidable: true }))
  .use(router.allowedMethods())
  .use(koaHelmet())
  .use(koaCors())
  .use(router.routes());

app.listen(process.env.PORT, Listening);
function Listening() {
  console.log(`♥️♥️♥️♥️♥️  listening now at port`, process.env.PORT);
}
// const server = http.createServer(app.callback());
// socket(server);
// server.listen(process.env.PORT);

// 채팅세션, 노티피케이션클라, 보배같은 포인트 상승 로직, 어드민 로그인, 모델 리모델링
