import { Model, ModelStatic } from 'sequelize';

const getFirstObjectId = async <T extends Model>(
  model: ModelStatic<T>,
): Promise<number | undefined> => {
  const blogs = await model.findAll();
  return blogs[0]?.get('id') as number | undefined;
};

export default { getFirstObjectId };
