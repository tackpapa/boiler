import Router from 'koa-router';
import apiController from 'controllers/apiController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/api',
});

router.get('/home', apiController.home);
router.get('/hotsearch', apiController.hotsearch);
router.get('/tag/:tag', apiController.tag);
router.get('/tips', apiController.tips);
router.get('/questions', apiController.questions);

export default router;
