import { StyleSheet, View } from 'react-native';
import Text from './Text';

export const formatCount = (count) => {
  if (count >= 1000) {
    return `${(Math.round((count / 1000) * 10) / 10).toFixed(1)}k`;
  } else {
    return count.toString();
  }
};

const styles = StyleSheet.create({
  counts: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
  },
  count: {
    textAlign: 'center',
  },
});

const CountList = ({ item }) => {
  return (
    <View style={styles.counts}>
      <View>
        <Text fontWeight="bold" style={styles.count}>
          {formatCount(item.stargazersCount)}
        </Text>
        <Text color="textSecondary" style={styles.count}>
          Stars
        </Text>
      </View>
      <View>
        <Text fontWeight="bold" style={styles.count}>
          {formatCount(item.forksCount)}
        </Text>
        <Text color="textSecondary" style={styles.count}>
          Forks
        </Text>
      </View>
      <View style={styles.count}>
        <Text fontWeight="bold" style={styles.count}>
          {formatCount(item.reviewCount)}
        </Text>
        <Text color="textSecondary" style={styles.count}>
          Reviews
        </Text>
      </View>
      <View>
        <Text fontWeight="bold" style={styles.count}>
          {formatCount(item.ratingAverage)}
        </Text>
        <Text color="textSecondary" style={styles.count}>
          Rating
        </Text>
      </View>
    </View>
  );
};

export default CountList;
