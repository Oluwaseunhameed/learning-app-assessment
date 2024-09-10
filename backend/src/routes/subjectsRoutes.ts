import { Router } from 'express';
import { getSubjects } from '../controllers/subjectsController';

const router = Router();

// Add query parameters for pagination (optional)
router.get('/', getSubjects);

export default router;
