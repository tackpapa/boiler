import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export interface JWT {
  _id: mongoose.Types.ObjectId;
  email: string;
}

const option = {
  expiresIn: '7d',
};

const generateToken = (payload: JWT) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(payload, process.env.JWT_SECRET!, option, (error, token) => {
      if (error || !token) {
        reject(error);
        return;
      }
      resolve(token);
    });
  });

export const decodeJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET!) as JWT;

export const requireAuth = (ctx: Context, next: () => void) => {
  if (!ctx.state.user) {
    ctx.body = 'Unauthorized go login';
    ctx.status = 401;
    return null;
  }
  return next();
};
export const jwtParser = async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.header.authorization;
  if (token) {
    const user = decodeJWT(token.replace(/^Bearer /, ''));
    ctx.state.user = user;
    // const session = await db.Session.findOne({
    //   userId: user._id,
    // });
    // if (session) {
    //   ctx.state.socketId = session.connectionId;
    // }
  }
  await next();
};

export default generateToken;
