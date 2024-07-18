import { DataTypes, QueryInterface } from 'sequelize';

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  await queryInterface.addColumn('users', 'password_hash', {
    type: DataTypes.STRING,
    allowNull: false,
  });
  await queryInterface.addColumn('users', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
  });
  await queryInterface.addColumn('users', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
  });

  await queryInterface.createTable('blogs', {
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
  });
  await queryInterface.addColumn('blogs', 'year_written', {
    type: DataTypes.INTEGER,
    validate: {
      min: 1991,
      max: new Date().getFullYear(),
      isInt: true,
    },
  });
  await queryInterface.addColumn('blogs', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  });
  await queryInterface.addColumn('blogs', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
  });
  await queryInterface.addColumn('blogs', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
  });
};

export const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.dropTable('blogs');
  await queryInterface.dropTable('users');
};
