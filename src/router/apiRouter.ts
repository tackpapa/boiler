import Router from 'koa-router';
import apiController from 'controllers/apiController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/api',
});

router.get('/home', apiController.home);

export default router;
