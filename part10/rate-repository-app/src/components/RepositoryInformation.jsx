import { View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    alignItems: 'flex-start',
  },
  description: {
    marginTop: 2,
    marginBottom: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
  },
});

const RepositoryInformation = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" fontSize="subheading">
        {item.fullName}
      </Text>
      <View style={styles.description}>
        <Text color="textSecondary">{item.description}</Text>
      </View>
      <Text color="white" style={styles.language}>
        {item.language}
      </Text>
    </View>
  );
};

export default RepositoryInformation;
