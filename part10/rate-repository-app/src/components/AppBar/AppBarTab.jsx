import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../Text';
import useSignOut from '../../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
});

const AppBarTab = ({ text, path }) => {
  const signOut = useSignOut();

  if (!path) {
    return (
      <Pressable onPress={signOut} style={styles.container}>
        <Text color="white" fontSize="subheading" fontWeight="bold">
          {text}
        </Text>
      </Pressable>
    );
  }
  return (
    <Link to={path} style={styles.container}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {text}
      </Text>
    </Link>
  );
};

export default AppBarTab;
