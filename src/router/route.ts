import Router from 'koa-router';
import userRouter from './userRouter';
import postRouter from './postRouter';
import commentRouter from './commentRouter';
import marketRouter from './marketRouter';
import apiRouter from './apiRouter';
import bannerRouter from './bannerRouter';
import jobRouter from './jobRouter';
import tier from './../controllers/tier';

const router = new Router();
router.use(userRouter.routes());
router.use(postRouter.routes());
router.use(commentRouter.routes());
router.use(marketRouter.routes());
router.use(apiRouter.routes());
router.use(bannerRouter.routes());
router.use(jobRouter.routes());

router.get('/', (ctx) => {
  const _tier = tier(18992);
  console.log(_tier);
  ctx.body = _tier;
});

export default router;
