import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Completion from './Completion';

class Topic extends Model {
  public id!: number;
  public title!: string;
  public video!: string;
  public description!: string;
}

Topic.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  video: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'topics',
  timestamps: true,
});

Topic.hasMany(Completion, { foreignKey: 'topicId' });
Completion.belongsTo(Topic, { foreignKey: 'topicId' });

export default Topic;
