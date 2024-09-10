import { Completion, User, SubjectCompletion } from '../models';

export const rankLearnersByCompletion = async (subjectId: number) => {
  try {
    // Fetch all completions for the subject
    const completions = await Completion.findAll({
      include: [
        { model: User }
      ],
      where: { subjectId }
    });

    // Process rankings here
    const userCompletions = completions.reduce((acc, completion) => {
      if (!acc[completion.userId]) {
        acc[completion.userId] = { userId: completion.userId, count: 0 };
      }
      acc[completion.userId].count++;
      return acc;
    }, {} as Record<number, { userId: number; count: number }>);

    // Fetch subject completion records to calculate completion rate if needed
    const subjectCompletions = await SubjectCompletion.findAll({
      where: { subjectId }
    });

    // Calculate completion rates (optional if you need more granular data)
    const completionRates = Object.values(userCompletions).map(userCompletion => {
      const totalTopics = subjectCompletions.length;
      const completionRate = (userCompletion.count / totalTopics) * 100; // Percentage
      return {
        ...userCompletion,
        completionRate
      };
    });

    // Sort by completion rate
    const sortedRankings = completionRates.sort((a, b) => b.completionRate - a.completionRate);

    return sortedRankings;
  } catch (error) {
    console.error('Error fetching rankings:', error);
    throw new Error('Error fetching rankings');
  }
};
