import Router from 'koa-router';
import JobController from 'controllers/jobController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/job',
});

router.post('/create', JobController.create);
router.get('/deleteone/:id', JobController.deleteone);
router.get('/findone/:id', JobController.findone);
router.get('/search/:query', JobController.search);
router.get('/latest', JobController.latest);
router.post('/update/:id', JobController.update);

export default router;
