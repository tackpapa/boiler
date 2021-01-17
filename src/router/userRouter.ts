import Router from 'koa-router';
import UserController from 'controllers/userController';

const router = new Router({
  prefix: '/user',
});

router.get('/:id', UserController.findone);
router.post('/create', UserController.create);
router.post('/login', UserController.login);
router.post('/update', UserController.update);
router.post('/deleteuser', UserController.deleteone);
router.get('/logout', UserController.logout);

export default router;
