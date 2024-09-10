import Completion from '../models/Completion';
import { Topic, Subject, User, SubjectCompletion } from '../models';

// Track a topic completion
export const trackTopicCompletion = async (userId: number, topicId: number, subjectId: number) => {
  try {
    // Ensure the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Ensure the topic exists
    const topic = await Topic.findByPk(topicId);
    if (!topic) {
      throw new Error('Topic not found');
    }

    // Check if the completion already exists
    const existingCompletion = await Completion.findOne({
      where: { userId, topicId, subjectId }
    });

    if (existingCompletion) {
      throw new Error('Topic already completed by this user');
    }

    // Create a new completion record
    await Completion.create({ userId, topicId, subjectId, completedAt: new Date() });

    console.log(`User ${userId} completed topic ${topicId} in subject ${subjectId}`);
  } catch (error) {
    // Rethrow error to be handled by the controller
    if (error instanceof Error) {
      console.error(`Error tracking topic completion: ${error.message}`);
      throw error;
    } else {
      console.error(`Unknown error tracking topic completion: ${error}`);
      throw new Error('Unknown error occurred');
    }
  }
};


// Track subject completion
export const trackSubjectCompletion = async (userId: number, subjectId: number) => {
  try {
    // Ensure the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Ensure the subject exists
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      throw new Error('Subject not found');
    }

    // Find all topics under the given subject
    const topics = await Topic.findAll({ where: { subjectId } });

    if (topics.length === 0) {
      throw new Error('No topics found for the given subject');
    }

    // Collect all topic IDs
    const topicIds = topics.map(topic => topic.id);

    // Find completions for the given user and subject's topics
    const completions = await Completion.findAll({
      where: { userId, topicId: topicIds }
    });

    // Collect completed topic IDs
    const completedTopicIds = completions.map(completion => completion.topicId);

    // Check if the number of completed topics matches the total number of topics
    const allTopicsCompleted = topicIds.every(id => completedTopicIds.includes(id));

    if (allTopicsCompleted) {
      // Check if a subject completion record already exists
      const existingSubjectCompletion = await SubjectCompletion.findOne({
        where: { userId, subjectId }
      });

      if (!existingSubjectCompletion) {
        // Create a new subject completion record
        await SubjectCompletion.create({
          userId,
          subjectId,
          completedAt: new Date()
        });

        console.log(`User ${userId} completed subject ${subjectId}`);
      } else {
        console.log(`User ${userId} already has a completion record for subject ${subjectId}`);
      }
    } else {
      console.log(`User ${userId} has not completed all topics in subject ${subjectId}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error tracking subject completion: ${error.message}`);
    } else {
      console.error(`Unknown error tracking subject completion: ${error}`);
    }
    throw error;
  }
};

// Get completion status for a subject and user
export const getUserSubjectCompletionStatus = async (userId: number, subjectId: number) => {
  try {
    // Ensure the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Ensure the subject exists
    const subject = await Subject.findByPk(subjectId);
    if (!subject) {
      throw new Error('Subject not found');
    }

    // Find all topics under the given subject
    const topics = await Topic.findAll({ where: { subjectId } });

    if (topics.length === 0) {
      throw new Error('No topics found for the given subject');
    }

    // Collect all topic IDs
    const topicIds = topics.map(topic => topic.id);

    // Find completions for the given user and subject's topics
    const completions = await Completion.findAll({
      where: { userId, topicId: topicIds }
    });

    // Collect completed topic IDs
    const completedTopicIds = completions.map(completion => completion.topicId);

    // Check if the number of completed topics matches the total number of topics
    const allTopicsCompleted = topicIds.every(id => completedTopicIds.includes(id));

    return {
      userId,
      subjectId,
      allTopicsCompleted,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error getting subject completion status: ${error.message}`);
    } else {
      console.error(`Unknown error getting subject completion status: ${error}`);
    }
    throw error;
  }
};
