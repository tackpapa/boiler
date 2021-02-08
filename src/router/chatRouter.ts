import Router from 'koa-router';
import ChatController from 'controllers/chatController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/chat',
});

router.post('/send', ChatController.send);
router.get('/bringchats/:date?', ChatController.bringchats);

export default router;
