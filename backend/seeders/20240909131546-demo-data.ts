'use strict';

import bcrypt from 'bcrypt';

/** Helper function to hash passwords */
const getHashedPasswords = () => {
  return Promise.all([
    bcrypt.hash('password123', 10),
    bcrypt.hash('securepassword', 10),
    bcrypt.hash('alice.password', 10),
  ]);
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return getHashedPasswords()
      .then(([hashedPassword1, hashedPassword2, hashedPassword3]) => {
        return queryInterface.bulkInsert('users', [
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: hashedPassword1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: hashedPassword2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            password: hashedPassword3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      })
      .then(() => {
        return queryInterface.bulkInsert('subjects', [
          {
            id: 1,
            title: 'Introduction to Programming',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            title: 'Advanced Database Systems',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      })
      .then(() => {
        return queryInterface.bulkInsert('topics', [
          {
            id: 1,
            title: 'Variables and Data Types',
            video: 'http://example.com/video1.mp4',
            description: 'An introduction to variables and data types in programming.',
            subjectId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            title: 'Control Structures',
            video: 'http://example.com/video2.mp4',
            description: 'Learn about different control structures in programming.',
            subjectId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            title: 'Normalization',
            video: 'http://example.com/video3.mp4',
            description: 'Understanding normalization in database design.',
            subjectId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 4,
            title: 'Indexing',
            video: 'http://example.com/video4.mp4',
            description: 'How indexing improves database performance.',
            subjectId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      })
      .then(() => {
        return queryInterface.bulkInsert('completions', [
          {
            id: 1,
            userId: 1,
            topicId: 1,
            subjectId: 1,
            completedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            userId: 1,
            topicId: 2,
            subjectId: 2,
            completedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 3,
            userId: 2,
            topicId: 3,
            subjectId: 2,
            completedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 4,
            userId: 3,
            topicId: 4,
            subjectId: 2,
            completedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      })
      .then(() => {
        return queryInterface.bulkInsert('subject_completions', [
          {
            id: 1,
            userId: 1,
            subjectId: 1,
            completedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            userId: 2,
            subjectId: 2,
            completedAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { id: [1, 2, 3] });
    await queryInterface.bulkDelete('subjects', { id: [1, 2] });
    await queryInterface.bulkDelete('topics', { id: [1, 2, 3, 4] });
    await queryInterface.bulkDelete('completions', { id: [1, 2, 3, 4] });
    await queryInterface.bulkDelete('subject_completions', { id: [1, 2] });
  },
};
