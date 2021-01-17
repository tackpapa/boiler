import db from 'db';
import {Controller} from './types'
const crypto = require('crypto');

const findOne:Controller = (ctx) => {
    const { email } = ctx.request.body;
    
    const user = db.users.findOne({
        email
    });

    ctx.body = user;
    return user

}

const hash:Controller = (_password: any){
    return crypto.createHash('sha256', process.env.SECRET_KEY).update(_password).digest('hex');
}

export default { findOne, hash}