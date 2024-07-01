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
import { object, ref, string } from 'yup';
import Text from '../Text';
import theme from '../../theme';
import useSignIn from '../../hooks/useSignIn';
import useSignUp from '../../hooks/useSignUp';

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

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: object({
      username: string().required('Username is required').min(5).max(30),
      password: string().required('Password is required').min(5).max(30),
      passwordConfirmation: string()
        .oneOf([ref('password'), null])
        .required('Password confirmation is required'),
    }),
    onSubmit,
  });
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <Text fontSize="heading" fontWeight="bold" style={styles.title}>
            Sign Up
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

          <TextInput
            placeholder="Password confirmation"
            value={formik.values.passwordConfirmation}
            onChangeText={formik.handleChange('passwordConfirmation')}
            secureTextEntry
            style={[
              styles.input,
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
                ? styles.inputError
                : null,
            ]}
            error
          />
          {formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation && (
              <Text style={styles.validationError}>
                {formik.errors.passwordConfirmation}
              </Text>
            )}
          <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();

  const handleSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={handleSubmit} />;
};

export default SignUp;
