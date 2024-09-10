import { Request, Response } from 'express';
import { trackTopicCompletion, trackSubjectCompletion } from '../services/completionsService';
import { getUserSubjectCompletionStatus } from '../services/completionsService';
import { sendResponse } from '../utils/responseUtils';

export const completeTopic = async (req: Request, res: Response) => {
  const { userId, topicId, subjectId } = req.body;

  try {
    await trackTopicCompletion(userId, topicId, subjectId);
    return sendResponse(res, 200, 'Topic marked as completed');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error tracking topic completion:', error.message);
      sendResponse(res, 400, error.message);
    } else {
      console.error('Unexpected error tracking topic completion:', error);
      sendResponse(res, 500, 'Internal server error');
    }
  }
};

export const completeSubject = async (req: Request, res: Response) => {
  const { userId, subjectId } = req.body;

  try {
    await trackSubjectCompletion(userId, subjectId);
    return sendResponse(res, 200, 'Subject marked as completed');
  } catch (error) {
    console.error('Error tracking subject completion:', error);
    return sendResponse(res, 500, 'Error tracking subject completion', { error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getUserSubjectCompletionStatusController = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const subjectId = parseInt(req.params.subjectId, 10);

    const status = await getUserSubjectCompletionStatus(userId, subjectId);

    sendResponse(res, 200, 'User subject completion status retrieved successfully', status);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error getting user subject completion status:', error.message);
      sendResponse(res, 400, error.message);
    } else {
      console.error('Unexpected error getting user subject completion status:', error);
      sendResponse(res, 500, 'Internal server error');
    }
  }
};
