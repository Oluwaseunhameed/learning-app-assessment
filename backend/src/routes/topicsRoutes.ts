import { Router } from 'express';
import { getTopicsBySubject, getTopicDetails } from '../controllers/topicsController';

const router = Router();

router.get('/subject/:subjectId', getTopicsBySubject);
router.get('/:topicId', getTopicDetails);

export default router;
