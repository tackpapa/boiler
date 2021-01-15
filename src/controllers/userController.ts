import db from 'db';
import Koa  from 'koa';
import {Controller} from './types'


const create:Controller = (ctx) => {
    const { email, password } = ctx.request.body;
    db.users.create({
        email,
        password
    });

    ctx.status = 200

}

export default {create}
