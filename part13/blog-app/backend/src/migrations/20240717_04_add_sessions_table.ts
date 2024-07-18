import { DataTypes, QueryInterface } from 'sequelize';

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.createTable('Sessions', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
};

export const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.dropTable('Sessions');
};
