import { useQuery } from '@apollo/client';
import {
  GET_REPOSITORIES,
  GET_ORDERED_REPOSITORIES,
  GET_REPOSITORIES_BY_NAME,
} from '../graphql/queries';

const useRepositories = (selectedFilter, searchQuery) => {
  let query;
  let variables;

  switch (selectedFilter) {
    case 'lr':
      query = GET_ORDERED_REPOSITORIES;
      variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC', first: 5 };
      break;
    case 'hrr':
      query = GET_ORDERED_REPOSITORIES;
      variables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
        first: 5,
      };
      break;
    case 'lrr':
      query = GET_ORDERED_REPOSITORIES;
      variables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
        first: 5,
      };
      break;
    default:
      if (searchQuery) {
        query = GET_REPOSITORIES_BY_NAME;
        variables = { searchKeyword: searchQuery, first: 5 };
      } else {
        query = GET_REPOSITORIES;
        variables = { first: 5 };
      }
      break;
  }

  const { data, loading, error, fetchMore } = useQuery(query, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return { data, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;
