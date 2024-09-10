import { Request, Response } from 'express';
import { fetchSubjects } from '../services/subjectsService';
import { sendResponse } from '../utils/responseUtils';

export const getSubjects = async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string, 10) || undefined;
  const offset = parseInt(req.query.offset as string, 10) || undefined;
  try {
    const subjects = await fetchSubjects(limit, offset);

    if (subjects.length === 0) {
      return sendResponse(res, 404, 'No subjects found');
    }
    return sendResponse(res, 200, 'Success', { subjects });
  } catch (error) {
    console.error('Error fetching subjects:', error);
    return sendResponse(res, 500, 'Internal Server Error');
  }
};
