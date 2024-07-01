import { Text, View } from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../../hooks/useRepository';
import RepositoryItem from '../RepositoryItem';
import ReviewList from '../ReviewList';

const RepositoryView = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useRepository(id);

  const onEndReach = () => {
    fetchMore();
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Something went wrong</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <RepositoryItem displayButton item={data.repository} />
      <ReviewList
        reviews={data.repository.reviews.edges.map((review) => review.node)}
        onEndReach={onEndReach}
      />
    </View>
  );
};

export default RepositoryView;
