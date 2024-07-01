import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const createUser = async ({ username, password }) => {
    const savedUser = await mutate({
      variables: { user: { username, password } },
    });
    return savedUser;
  };

  return [createUser, result];
};

export default useSignUp;
