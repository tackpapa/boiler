import Router from 'koa-router';
import PostController from 'controllers/postController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/post',
});

router.post('/create', requireAuth, PostController.create);
router.get('/deleteone:id', requireAuth, PostController.deleteone);
router.get('/findone/:id', PostController.findone);
router.get('/latest', PostController.latest);
router.post('/update:id', requireAuth, PostController.update);

export default router;
