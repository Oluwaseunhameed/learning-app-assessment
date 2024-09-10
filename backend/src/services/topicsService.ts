import { Topic } from '../models';

export const fetchTopicsBySubject = async (subjectId: number) => {
  try {
    return await Topic.findAll({ where: { subjectId } });
  } catch (error) {
    console.error('Error fetching topics by subject:', error);
    throw new Error('Unable to fetch topics for the given subject.');
  }
};

export const fetchTopicDetails = async (topicId: number) => {
  try {
    // Retrieve topic by primary key
    const topic = await Topic.findByPk(topicId);

    // Throw error if topic not found
    if (!topic) {
      throw new Error('Topic not found');
    }

    // Return the topic with all fields
    return topic;
  } catch (error) {
    console.error('Error fetching topic details:', error);
    throw new Error('Unable to fetch topic details.');
  }
};
