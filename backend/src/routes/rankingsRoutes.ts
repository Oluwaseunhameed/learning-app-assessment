import { Router } from 'express';
import { getRankings } from '../controllers/rankingsController';

const router = Router();

// Route to get rankings by subject ID
router.get('/:subjectId', getRankings);

export default router;
