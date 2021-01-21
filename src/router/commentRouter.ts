import Router from 'koa-router';
import commentController from 'controllers/commentController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/comment',
});

router.post('/create', commentController.create);
router.post('/update/:id', commentController.update);
router.get('/delete/:id', commentController.deleteone);

export default router;
