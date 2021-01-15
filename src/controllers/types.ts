import Koa from 'koa';

interface ParsedContext extends Omit<Koa.Context, 'request'> {
    request: any;
}
export type Controller = (ctx: ParsedContext) => void;