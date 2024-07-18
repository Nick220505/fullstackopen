import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { sequelize } from '@/utils/db';
import Blog from './Blog';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;

  declare username: string;

  declare name: string;

  declare passwordHash: string;

  declare admin: CreationOptional<boolean>;

  declare disabled: CreationOptional<boolean>;

  declare getBlogs: HasManyGetAssociationsMixin<Blog>;

  override toJSON() {
    const values = { ...this.get() } as {
      [key: string]: string | number | boolean | Blog[];
      passwordHash?: string;
    };
    delete values.passwordHash;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    disabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize, modelName: 'user', underscored: true },
);

export default User;
