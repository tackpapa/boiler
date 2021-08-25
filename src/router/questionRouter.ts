import Router from 'koa-router';
import QuestionController from 'controllers/questionController';
import { requireAuth } from 'utils/jwt';

const router = new Router({
  prefix: '/question',
});

router.post('/create', requireAuth, QuestionController.create);
router.get('/deleteone/:id', requireAuth, QuestionController.deleteone);
router.get('/findone/:id', QuestionController.findone);
router.get('/search/:query', QuestionController.search);
router.get('/bycategory/:query/:last', QuestionController.byCategory);
router.get('/latest/:last', QuestionController.latest);
router.get('/questionpage/:page', QuestionController.questionpage);
router.get('/allquestion/:last', QuestionController.allquestion);
router.get('/newones/:last', QuestionController.newones);
router.post('/update/:id', requireAuth, QuestionController.update);

export default router;
