import Router from 'koa-router';
import JobController from 'controllers/jobController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/job',
});

router.post('/create', requireAuth, JobController.create);
router.get('/deleteone/:id', requireAuth, JobController.deleteone);
router.get('/findone/:id', JobController.findone);
router.get('/search/:query', JobController.search);
router.get('/bycategory/:query/:last', JobController.byCategory);
router.get('/latest/:last', JobController.latest);
router.get('/alljob/:last', JobController.alljob);
router.get('/jobpage/:page', JobController.jobpage);
router.get('/newones/:last', JobController.newones);
router.post('/update/:id', requireAuth, JobController.update);

export default router;
