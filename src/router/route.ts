import Router from 'koa-router';
import userRouter from './userRouter';
import postRouter from './postRouter';
import commentRouter from './commentRouter';
import questionRouter from './questionRouter';
import apiRouter from './apiRouter';
import bannerRouter from './bannerRouter';
import tipRouter from './tipRouter';

const router = new Router();
router.use(userRouter.routes());
router.use(postRouter.routes());
router.use(commentRouter.routes());
router.use(questionRouter.routes());
router.use(apiRouter.routes());
router.use(bannerRouter.routes());
router.use(tipRouter.routes());

router.get('/', (ctx) => {
  ctx.body = 'welcome to kimbyun';
});

export default router;
