import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { sequelize } from '@/utils/db';

class Team extends Model<InferAttributes<Team>, InferCreationAttributes<Team>> {
  declare id: CreationOptional<number>;

  declare name: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, modelName: 'team', underscored: true, timestamps: false },
);

export default Team;
