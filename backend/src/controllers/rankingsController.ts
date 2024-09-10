import { Request, Response } from 'express';
import { rankLearnersByCompletion } from '../services/rankingsService';
import { sendResponse } from '../utils/responseUtils';

export const getRankings = async (req: Request, res: Response) => {
  const subjectId = parseInt(req.params.subjectId, 10);

  if (isNaN(subjectId)) {
    return sendResponse(res, 400, 'Invalid subject ID');
  }

  try {
    const rankings = await rankLearnersByCompletion(subjectId);

    // Process and sort the rankings
    const processedRankings = rankings.map(ranking => {
      // Compute ranking logic here
      return {
        userId: ranking.userId,
        completionRate: ranking.completionRate, // Placeholder field
      };
    }).sort((a, b) => b.completionRate - a.completionRate);

    return sendResponse(res, 200, 'Rankings fetched successfully', { rankings: processedRankings });
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return sendResponse(res, 500, 'Error fetching rankings', { error: (error as Error).message });
  }
};