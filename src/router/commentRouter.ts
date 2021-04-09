import Router from 'koa-router';
import commentController from 'controllers/commentController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/comment',
});

router.post('/create', requireAuth, commentController.create);
router.post('/update/:id', requireAuth, commentController.update);
router.get('/allcomments/:last', commentController.allcomment);
router.get('/deleteone/:id', requireAuth, commentController.deleteone);
router.get('/get/:id', commentController.getcomments);

export default router;
