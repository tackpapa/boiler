import Router from 'koa-router';
import userRouter from './userRouter'

const router = new Router();
router.use(userRouter.routes())

export default router;
