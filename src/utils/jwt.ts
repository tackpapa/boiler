import db from 'db';
import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export interface JWT {
  _id: mongoose.Types.ObjectId;
  kakaoId: number;
}

const option = {
  expiresIn: '30d',
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
    ctx.body = '로그인이 필요합니다';
    ctx.status = 401;
    return null;
  }
  return next();
};
export const jwtParser = async (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.header.authorization;

  if (token) {
    let user = undefined;
    try {
      user = decodeJWT(token.split(' ')[1]);
    } catch (error) {
      console.log(error);
    }
    ctx.state.user = user;

    if (user) {
      const session = await db.sessions.findOne({
        userId: `${user._id}`,
      });
      if (session) {
      }
    }
  }
  await next();
};

export default generateToken;
