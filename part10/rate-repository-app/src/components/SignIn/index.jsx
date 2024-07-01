import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import { object, string } from 'yup';
import Text from '../Text';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: theme.colors.white,
  },
  title: {
    margin: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  validationError: {
    color: 'red',
    marginLeft: 20,
  },
  button: {
    margin: 20,
    marginBottom: 40,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    padding: 10,
    textAlign: 'center',
  },
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: object({
      username: string().required('Username is required'),
      password: string().required('Password is required'),
    }),
    onSubmit,
  });
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <Text fontSize="heading" fontWeight="bold" style={styles.title}>
            Sign In
          </Text>
          <TextInput
            placeholder="Username"
            value={formik.values.username}
            onChangeText={formik.handleChange('username')}
            style={[
              styles.input,
              formik.touched.username && formik.errors.username
                ? styles.inputError
                : null,
            ]}
          />
          {formik.touched.username && formik.errors.username && (
            <Text style={styles.validationError}>{formik.errors.username}</Text>
          )}
          <TextInput
            placeholder="Password"
            value={formik.values.password}
            onChangeText={formik.handleChange('password')}
            secureTextEntry
            style={[
              styles.input,
              formik.touched.password && formik.errors.password
                ? styles.inputError
                : null,
            ]}
            error
          />
          {formik.touched.password && formik.errors.password && (
            <Text style={styles.validationError}>{formik.errors.password}</Text>
          )}
          <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return <SignInContainer onSubmit={handleSubmit} />;
};

export default SignIn;
