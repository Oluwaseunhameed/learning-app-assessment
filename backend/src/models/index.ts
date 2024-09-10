// models/index.ts
import User from './User';
import Topic from './Topic';
import Completion from './Completion';
import Subject from './Subject';
import SubjectCompletion from './SubjectCompletion';

// Initialize associations
User.hasMany(Completion, { foreignKey: 'userId' });
Completion.belongsTo(User, { foreignKey: 'userId' });

Topic.hasMany(Completion, { foreignKey: 'topicId' });
Completion.belongsTo(Topic, { foreignKey: 'topicId' });

User.hasMany(SubjectCompletion, { foreignKey: 'userId' });
SubjectCompletion.belongsTo(User, { foreignKey: 'userId' });

Subject.hasMany(SubjectCompletion, { foreignKey: 'subjectId' });
SubjectCompletion.belongsTo(Subject, { foreignKey: 'subjectId' });

export { User, Topic, Completion, Subject, SubjectCompletion };
