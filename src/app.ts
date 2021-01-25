// const Koa = require('Koa');
import Koa from 'Koa';
// const bodyParser = require('koa-body');
import bodyParser from 'koa-body';
// const koaCors = require('koa-cors');
import koaCors from 'koa-cors';
// const koaHelmet = require('koa-helmet');
import koaHelmet from 'koa-helmet';
import router from './router/route';
// const dotenv = require('dotenv');
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

app.listen(process.env.PORT, Listening);
function Listening() {
  console.log(`♥️♥️♥️♥️♥️  listening now at port`, process.env.PORT);
}
// const server = http.createServer(app.callback());
// socket(server);
// server.listen(process.env.PORT);

// 채팅세션, 노티피케이션클라, 어드민 로그인, 몽고레플리카설정 마스터 슬레이브, 로그아웃로직, 세션 로그아웃 등등
