import Router from 'koa-router';
import UserController from 'controllers/userController'

const router = new Router({
    prefix: '/user',
  });

router.post('/create', UserController.create)



export default router;