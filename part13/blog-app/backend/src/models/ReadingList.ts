import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { sequelize } from '@/utils/db';

class ReadingList extends Model<
  InferAttributes<ReadingList>,
  InferCreationAttributes<ReadingList>
> {
  declare id: CreationOptional<number>;

  declare userId: number;

  declare blogId: number;

  declare read: CreationOptional<boolean>;
}

ReadingList.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    blogId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'blogs', key: 'id' },
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'reading_list',
    underscored: true,
    timestamps: false,
  },
);

export default ReadingList;
