import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { Link } from 'react-router-native';
import useDeleteReview from '../hooks/useDeleteReview';
import Text from './Text';
import theme from '../theme';
import formatDate from '../utils/dateFormatter';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'row',
  },
  ratingContainer: {
    width: '20%',
    alignItems: 'flex-start',
  },
  rating: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    width: 50,
    height: 50,
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
  },
  username: {
    fontWeight: theme.fontWeights.bold,
  },
  repositoryName: {
    fontWeight: theme.fontWeights.bold,
  },
  reviewInfoContainer: {
    flexDirection: 'column',
    marginTop: 15,
    marginBottom: 15,
    width: '80%',
  },
  createdAt: {
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    marginTop: 10,
    backgroundColor: theme.colors.white,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
  },
  buttonText: {
    textAlign: 'center',
  },
  viewRepoButton: {
    backgroundColor: theme.colors.primary,
  },
  deleteReviewButton: {
    backgroundColor: 'red',
  },
});

const ReviewItem = ({ review, myReviews }) => {
  const [deleteReview] = useDeleteReview();

  const handleDeletion = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteReview(id),
        },
      ]
    );
  };

  return (
    <View style={{ backgroundColor: theme.colors.white }}>
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <View style={styles.rating}>
            <Text style={styles.ratingText}>{review.rating}</Text>
          </View>
        </View>
        <View style={styles.reviewInfoContainer}>
          {myReviews ? (
            <Text style={styles.repositoryName}>{review.repository.name}</Text>
          ) : (
            <Text style={styles.username}>{review.user.username}</Text>
          )}
          <Text style={styles.createdAt}>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      {myReviews && (
        <View style={styles.buttonContainer}>
          <Link
            to={`/repository/${review.repository.id}`}
            style={[styles.viewRepoButton, styles.button]}
          >
            <Text color="white" fontWeight="bold" style={styles.buttonText}>
              View repository
            </Text>
          </Link>
          <Pressable
            style={[styles.deleteReviewButton, styles.button]}
            onPress={() => handleDeletion(review.id)}
          >
            <Text color="white" fontWeight="bold" style={styles.buttonText}>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
