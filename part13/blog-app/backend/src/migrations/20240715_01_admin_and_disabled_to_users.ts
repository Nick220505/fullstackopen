import { DataTypes, QueryInterface } from 'sequelize';

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.addColumn('users', 'admin', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  });
};

export const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}) => {
  await queryInterface.removeColumn('users', 'admin');
  await queryInterface.removeColumn('users', 'disabled');
};
