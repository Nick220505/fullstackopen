import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { sequelize } from '@/utils/db';

class Membership extends Model<
  InferAttributes<Membership>,
  InferCreationAttributes<Membership>
> {
  declare id: CreationOptional<number>;

  declare userId: number;

  declare teamId: number;
}

Membership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'teams', key: 'id' },
    },
  },
  {
    sequelize,
    modelName: 'membership',
    underscored: true,
    timestamps: false,
  },
);

export default Membership;
