import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { sequelize } from '@/utils/db';

class Blog extends Model<InferAttributes<Blog>, InferCreationAttributes<Blog>> {
  declare id: CreationOptional<number>;

  declare author: string;

  declare url: string;

  declare title: string;

  declare likes: CreationOptional<number>;

  declare yearWritten: CreationOptional<number>;

  declare userId: number;

  override toJSON() {
    const values = { ...this.get() } as {
      [key: string]: string | number;
      userId?: number;
    };
    delete values.userId;
    return values;
  }
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    yearWritten: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Year written must be an integer.',
        },
        min: {
          args: [1991],
          msg: 'Year written must be at least 1991.',
        },
        max: {
          args: [new Date().getFullYear()],
          msg: 'Year written must be at most the current year.',
        },
      },
    },
  },
  { sequelize, modelName: 'blog', underscored: true },
);

export default Blog;
