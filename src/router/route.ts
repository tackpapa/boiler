import Router from 'koa-router';
import userRouter from './userRouter';
import postRouter from './postRouter';
import commentRouter from './commentRouter';
import marketRouter from './marketRouter';
import { requireAuth } from 'utils/jwt';

const router = new Router();
router.use(userRouter.routes());
router.use(postRouter.routes());
router.use(commentRouter.routes());
router.use(marketRouter.routes());

router.get('/', (ctx) => {
  ctx.body = 'Home';
});

export default router;
