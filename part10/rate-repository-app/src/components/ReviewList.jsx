import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import ItemSeparator from './ItemSeparator';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  message: {
    textAlign: 'center',
    margin: 20,
  },
});

const ReviewList = ({ reviews, onEndReach, myReviews }) => {
  if (reviews.length === 0) {
    return (
      <View>
        <Text fontSize="heading" fontWeight="bold" style={styles.message}>
          No reviews were found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      ListHeaderComponent={ItemSeparator}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewItem review={item} myReviews={myReviews} />
      )}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ReviewList;
