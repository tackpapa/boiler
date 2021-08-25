import Router from 'koa-router';
import TipController from 'controllers/tipController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/Tip',
});

router.post('/create', requireAuth, TipController.create);
router.get('/deleteone/:id', requireAuth, TipController.deleteone);
router.get('/findone/:id', TipController.findone);
router.get('/search/:query', TipController.search);
router.get('/bycategory/:query/:last', TipController.byCategory);
router.get('/latest/:last', TipController.latest);
router.get('/allTip/:last', TipController.alltip);
router.get('/Tippage/:page', TipController.tippage);
router.get('/newones/:last', TipController.newones);
router.post('/update/:id', requireAuth, TipController.update);

export default router;
