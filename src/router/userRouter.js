import Router from 'koa-router';
import UserController from 'controllers/UserController'

const router = new Router({
    prefix: '/user',
  });

router.post('/create', UserController.create)

router.post('/hire', RequireAuth, UserController.hire)


export default router;