import Router from 'koa-router';
import apiController from 'controllers/apiController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/api',
});

router.get('/home', apiController.home);
router.get('/tag/:tag', apiController.tag);
router.get('/hotpost', apiController.hotPosts);
router.get('/jobs', apiController.jobs);
router.get('/hotjobs', apiController.hotJobs);
router.get('/product', apiController.products);
router.get('/hotproduct', apiController.hotProducts);

export default router;
