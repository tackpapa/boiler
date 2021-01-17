import db from 'db';
import {Controller} from './types'


const create:Controller = (ctx) => {
    const { email, password } = ctx.request.body;
    db.users.create({
        email,
        password
    });

    ctx.body = 'hello world'

}

const update:Controller = (ctx) => {
    const { email, password } = ctx.request.body;
    db.users.create({
        email,
        password
    });

    ctx.body = 'hello world'

}

const deleteone:Controller = (ctx) => {
    const { email, password } = ctx.request.body;
    db.users.create({
        email,
        password
    });

    ctx.body = 'hello world'

}

export default {create, deleteone, update}
