import Router from 'koa-router';
import apiController from 'controllers/apiController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/api',
});

router.get('/home', apiController.home);
router.post('/allpush', requireAuth, apiController.allpush);
router.get('/hotsearch', apiController.hotsearch);
router.get('/stats', apiController.stats);
router.get('/tag/:tag', apiController.tag);
router.get('/hotpost/:num', apiController.hotPosts);
router.get('/jobs', apiController.jobs);
router.get('/hotjobs', apiController.hotJobs);
router.get('/product', apiController.products);
router.get('/hotproduct', apiController.hotProducts);
router.post('/createcate', requireAuth, apiController.createcate);
router.get('/chatlist', requireAuth, apiController.chatlist);

export default router;
