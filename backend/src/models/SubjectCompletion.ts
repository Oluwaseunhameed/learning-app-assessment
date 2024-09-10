import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class SubjectCompletion extends Model {
  public id!: number;
  public userId!: number;
  public subjectId!: number;
  public completedAt!: Date;
}

SubjectCompletion.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  },  
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'subject_completions',
  timestamps: true,
});

export default SubjectCompletion;