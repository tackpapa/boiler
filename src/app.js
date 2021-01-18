const Koa = require('koa');
const bodyParser = require('koa-body');
const koaCors = require('koa-cors');
const koaHelmet = require('koa-helmet');
import router from './router/route';
const dotenv = require('dotenv');
import path from 'path';
import { jwtParser } from 'utils/jwt';

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

function Listening() {
  console.log(`listening now at port`, process.env.PORT);
}

app.listen(process.env.PORT, Listening);

// ctx.request.files form data가여기들어있음.
