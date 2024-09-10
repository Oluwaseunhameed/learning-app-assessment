import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Subject from './Subject';
import Topic from './Topic';

class Completion extends Model {
  public id!: number;
  public userId!: number;
  public topicId!: number;
  public subjectId!: number;
  public completedAt!: Date;
}

Completion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  topicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'topics',
      key: 'id',
    },
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'subjects',
      key: 'id',
    },
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'completions',
  timestamps: true,
});

export default Completion;
