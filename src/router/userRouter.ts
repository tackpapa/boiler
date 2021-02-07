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
router.get('/deleteuser/:id', UserController.deleteone);
router.get('/logout', UserController.logout);
router.post('/uploadprofile', UserController.uploadProfile);

export default router;
