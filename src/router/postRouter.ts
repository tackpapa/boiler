import Router from 'koa-router';
import PostController from 'controllers/postController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/post',
});

router.post('/create', PostController.create);
router.get('/deleteone/:id', PostController.deleteone);
router.get('/findone/:id', PostController.findone);
router.get('/search/:query', PostController.search);
router.get('/latest/:last', PostController.latest);
router.get('/bycategory/:query/:last', PostController.byCategory);
router.post('/update/:id', requireAuth, PostController.update);

export default router;
