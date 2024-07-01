import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import Constants from 'expo-constants';

import { GET_ME } from '../../graphql/queries';
import theme from '../../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight * 2,
    backgroundColor: theme.colors.secondary,
  },
  scrollViewContent: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(GET_ME);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
        <AppBarTab text="Repositories" path="/" />
        {data.me ? (
          <>
            <AppBarTab text="Create a review" path="/review-form" />
            <AppBarTab text="My reviews" path="/my-reviews" />
            <AppBarTab text="Sign Out" />
          </>
        ) : (
          <>
            <AppBarTab text="Sign In" path="/sign-in" />
            <AppBarTab text="Sign Up" path="/sign-up" />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
