import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

const useUserRepositories = () => {
  return useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true },
  });
};

export default useUserRepositories;
