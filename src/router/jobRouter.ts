import Router from 'koa-router';
import JobController from 'controllers/jobController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/job',
});

router.post('/create', requireAuth, JobController.create);
router.get('/deleteone:id', requireAuth, JobController.deleteone);
router.get('/findone/:id', JobController.findone);
router.get('/latest', JobController.latest);
router.post('/update:id', requireAuth, JobController.update);

export default router;
