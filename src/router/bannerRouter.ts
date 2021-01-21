import Router from 'koa-router';
import BannerController from 'controllers/bannerController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/banner',
});

router.get('/home', BannerController.home);
router.post('/create', BannerController.create);
router.del('/delete/:id', BannerController.deleteone);

export default router;
