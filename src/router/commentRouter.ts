import Router from 'koa-router';
import commentController from 'controllers/userController'

const router = new Router({
    prefix: '/comment',
  });

router.post('/create', commentController.create)
router.get('/update', commentController.update)
router.get('/delete', commentController.deleteone)





export default router;