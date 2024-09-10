import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

class Subject extends Model {
  public id!: number;
  public title!: string;
}

Subject.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'subjects',
  timestamps: true,
});

export default Subject;
