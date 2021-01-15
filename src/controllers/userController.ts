import db from 'db';
import Koa  from 'koa';

const create = (ctx:Koa.Context) => {

    const { email, password } = ctx.request.body
    db.users.create({
        email,
        password
    });
    ctx.body = {
        
    }

}