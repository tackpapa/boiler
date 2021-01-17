import Router from 'koa-router';
import PostController from 'controllers/postController';

const router = new Router({
  prefix: '/post',
});

router.post('/create', PostController.create);
router.get('/deleteone', PostController.deleteone);
router.get('/findone/:id', PostController.findone);
router.get('/findall/:tag', PostController.findall);
router.post('/update', PostController.update);

export default router;
