const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const koaCors = require('koa-cors');
const koaHelmet = require('koa-helmet');
var Router = require('koa-router');
const session = require('koa-session');
const mongo = require('koa-mongo');

const app = new Koa();
var router = new Router();



app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(bodyParser())
    .use(koaHelmet())
    .use(session(app))
    .use(koaCors())
    // .use(mongo({
    //     host: 'localhost',
    //     port: 27019,
    //     user: 'admin',
    //     pass: '123456',
    //     db: 'test',
    //     authSource: 'admin',
    //     max: 100,
    //     min: 1,
    //   }))    


app.use(async ctx => {
  ctx.body = 'Hello World';
});
const PORT = 3000
function Listening(){
    console.log(`listening now at port ${PORT}`) 
}

app.listen(PORT, Listening);