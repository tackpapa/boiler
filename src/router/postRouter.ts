import Router from 'koa-router';
import PostController from 'controllers/postController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/post',
});

router.post('/create', requireAuth, PostController.create);
router.get('/deleteone/:id', requireAuth, PostController.deleteone);
router.get('/findone/:id', PostController.findone);
router.get('/likeone/:id', requireAuth, PostController.likeone);
router.get('/dislikeone/:id', requireAuth, PostController.dislikeone);
router.get('/search/:query', PostController.search);
router.get('/latest/:last', PostController.latest);
router.get('/postpage/:page', PostController.postpage);
router.get('/allpost/:last', PostController.allpost);
router.get('/newones/:last', PostController.newones);
router.get('/bycategory/:query/:last', PostController.byCategory);
router.post('/update/:id', requireAuth, PostController.update);

export default router;
