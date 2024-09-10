import { Router } from 'express';
import { completeTopic, completeSubject, getUserSubjectCompletionStatusController } from '../controllers/completionsController';

const router = Router();

router.post('/complete-topic', completeTopic);
router.post('/complete-subject', completeSubject);
router.get('/status/:userId/:subjectId', getUserSubjectCompletionStatusController);

export default router;
