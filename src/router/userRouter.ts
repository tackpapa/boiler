import Router from 'koa-router';
import UserController from 'controllers/userController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/user',
});

router.get('/:id', requireAuth, UserController.findone);
router.get('/deletenoti/:id', requireAuth, UserController.deletenoti);
router.get('/alluser/:last', UserController.alluser);
router.get('/search/:query', UserController.search);
router.get('/profile/:id', requireAuth, UserController.userprofile);
router.post('/login', UserController.login);
router.post('/update', requireAuth, UserController.update);
router.get('/deleteuser/:id', requireAuth, UserController.deleteone);
router.get('/logout', requireAuth, UserController.logout);
router.post('/uploadprofile', requireAuth, UserController.uploadProfile);

export default router;
