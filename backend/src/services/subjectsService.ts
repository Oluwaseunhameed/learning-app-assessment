import { Subject } from '../models';

// Fetch subjects with optional pagination
export const fetchSubjects = async (limit?: number, offset?: number) => {
  try {
    return await Subject.findAll({
      limit,   // Optional limit for pagination
      offset   // Optional offset for pagination
    });
  } catch (error) {
    // Log the error for internal debugging
    console.error('Error fetching subjects from the database:', error);
    throw new Error('Unable to fetch subjects at this time.');
  }
};
