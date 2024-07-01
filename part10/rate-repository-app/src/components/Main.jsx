import { StyleSheet, View, Platform } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';
import theme from '../theme';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import ReviewForm from './ReviewForm';
import UserReviewList from './UserReviewList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: '#e1e4e8',
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.main,
    }),
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="/review-form" element={<ReviewForm />} />
        <Route path="/my-reviews" element={<UserReviewList />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
