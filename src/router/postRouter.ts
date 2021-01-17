import Router from 'koa-router';
import PostController from 'controllers/postController'

const router = new Router({
    prefix: '/post',
  });

router.post('/create', PostController.create)
router.get('/deleteone', PostController.deleteone)
router.get('/update', PostController.update)





export default router;