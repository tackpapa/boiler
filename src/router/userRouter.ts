import Router from 'koa-router';
import UserController from 'controllers/userController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/user',
});

router.get('/:id', UserController.findone);
router.get('/profile/:id', UserController.userprofile);
router.post('/create', UserController.create);
router.post('/login', UserController.login);
router.post('/update', requireAuth, UserController.update);
router.post('/deleteuser', UserController.deleteone);
router.get('/logout', UserController.logout);
router.post('/uploadProfile', UserController.uploadProfile);

export default router;
