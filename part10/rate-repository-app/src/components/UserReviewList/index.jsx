import { Text, View } from 'react-native';
import { useEffect } from 'react';
import useUserRepositories from '../../hooks/useUserRepositories';
import ReviewList from '../ReviewList';
import { useNavigate } from 'react-router-native';

const UserReviewList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useUserRepositories();

  useEffect(() => {
    if (!data?.me && !loading && !error) {
      navigate('/');
    }
  }, [data, loading, error, navigate]);

  if (error) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data?.me) {
    return null;
  }

  return (
    <ReviewList
      reviews={data.me.reviews.edges.map((edge) => edge.node)}
      myReviews
    />
  );
};

export default UserReviewList;
