const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaCors = require('koa-cors');
const koaHelmet = require('koa-helmet');
import router from './router/route'
const dotenv = require('dotenv');
import path from 'path';

dotenv.config({
  path: path.join(process.cwd(), `.env.${process.env.NODE_ENV}`),
});

const app = new Koa();

app
    .use(bodyParser())
    .use(router.allowedMethods())
    .use(koaHelmet())
    .use(koaCors())
    .use(router.routes())
      



function Listening(){
    console.log(`listening now at port`, process.env.PORT) 
}

app.listen(process.env.PORT, Listening);