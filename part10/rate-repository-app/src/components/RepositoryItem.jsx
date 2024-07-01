import { Image, View, StyleSheet, Pressable, Text } from 'react-native';
import { openURL } from 'expo-linking';
import theme from '../theme';
import RepositoryInformation from './RepositoryInformation';
import CountList from './CountList';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.white,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  informationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  button: {
    marginTop: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    padding: 15,
    textAlign: 'center',
    fontWeight: theme.fontWeights.bold,
  },
});

const RepositoryItem = ({ item, displayButton }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.informationContainer}>
        <Image
          style={styles.avatarImage}
          source={{ uri: item.ownerAvatarUrl }}
        />
        <RepositoryInformation item={item} />
      </View>
      <CountList item={item} />
      {displayButton && (
        <Pressable onPress={() => openURL(item.url)} style={styles.button}>
          <Text style={styles.buttonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
