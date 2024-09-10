import { Request, Response } from 'express';
import { fetchTopicsBySubject, fetchTopicDetails } from '../services/topicsService';
import { sendResponse } from '../utils/responseUtils';


export const getTopicsBySubject = async (req: Request, res: Response) => {
  const subjectId = parseInt(req.params.subjectId, 10);

  try {
    const topics = await fetchTopicsBySubject(subjectId);

    if (topics.length === 0) {
      return sendResponse(res, 404, 'No topics found for the given subject');
    }

    return sendResponse(res, 200, 'Success', { topics });
  } catch (error) {
    console.error('Error fetching topics:', error);
    return sendResponse(res, 500, 'An error occurred while fetching topics');
  }
};

export const getTopicDetails = async (req: Request, res: Response) => {
  const topicId = parseInt(req.params.topicId, 10);

  try {
    const topic = await fetchTopicDetails(topicId);

    if (topic) {
      return sendResponse(res, 200, 'Success', { topic });
    } else {
      return sendResponse(res, 404, 'Topic not found');
    }
  } catch (error) {
    console.error('Error fetching topic details:', error);
    return sendResponse(res, 500, 'An error occurred while fetching topic details');
  }
};
