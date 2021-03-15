import Router from 'koa-router';
import MarketController from 'controllers/marketController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/market',
});

router.post('/create', MarketController.create);
router.get('/deleteone/:id', MarketController.deleteone);
router.get('/findone/:id', MarketController.findone);
router.get('/search/:query', MarketController.search);
router.get('/bycategory/:query/:last', MarketController.byCategory);
router.get('/latest/:last', MarketController.latest);
router.post('/update/:id', MarketController.update);

export default router;
