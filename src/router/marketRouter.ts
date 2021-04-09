import Router from 'koa-router';
import MarketController from 'controllers/marketController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/market',
});

router.post('/create', requireAuth, MarketController.create);
router.get('/deleteone/:id', requireAuth, MarketController.deleteone);
router.get('/findone/:id', MarketController.findone);
router.get('/search/:query', MarketController.search);
router.get('/bycategory/:query/:last', MarketController.byCategory);
router.get('/latest/:last', MarketController.latest);
router.get('/allmarket/:last', MarketController.allmarket);
router.get('/newones/:last', MarketController.newones);
router.post('/update/:id', requireAuth, MarketController.update);

export default router;
