import Router from 'koa-router';
import BannerController from 'controllers/bannerController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/banner',
});

router.get('/home', BannerController.home);
router.post('/create', requireAuth, BannerController.create);
router.get('/banner/:category', BannerController.getbanner);
router.del('/delete/:id', requireAuth, BannerController.deleteone);

export default router;
