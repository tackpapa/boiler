import Router from 'koa-router';
import MarketController from 'controllers/marketController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/market',
});

router.post('/create', requireAuth, MarketController.create);
router.get('/deleteone:id', requireAuth, MarketController.deleteone);
router.get('/findone/:id', MarketController.findone);
router.get('/latest', MarketController.latest);
router.post('/update:id', requireAuth, MarketController.update);

export default router;
