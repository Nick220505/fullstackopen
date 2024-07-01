import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import { GET_ME, GET_REPOSITORIES } from '../graphql/queries';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [
      { query: GET_REPOSITORIES },
      { query: GET_ME, variables: { includeReviews: true } },
    ],
  });

  const deleteReview = async (id) => {
    await mutate({
      variables: { deleteReviewId: id },
    });
  };

  return [deleteReview, result];
};

export default useDeleteReview;
