import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { useFormik } from 'formik';
import theme from '../../theme';
import Text from '../Text';
import { number, object, string } from 'yup';
import useCreateReview from '../../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: theme.colors.white,
    paddingBottom: 200,
  },
  title: {
    textAlign: 'center',
    margin: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },
  textInput: {
    height: 150,
    textAlignVertical: 'top',
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

const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },
    validationSchema: object({
      ownerName: string().required('Repository owner username is required'),
      repositoryName: string().required('Repository name is required'),
      rating: number().required('Rating is required').integer().min(0).max(100),
    }),
    onSubmit,
  });
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View style={styles.container}>
          <Text fontSize="heading" fontWeight="bold" style={styles.title}>
            New Review
          </Text>
          <TextInput
            placeholder="Repository owner username"
            value={formik.values.ownerName}
            onChangeText={formik.handleChange('ownerName')}
            style={[
              styles.input,
              formik.touched.ownerName && formik.errors.ownerName
                ? styles.inputError
                : null,
            ]}
          />
          {formik.touched.ownerName && formik.errors.ownerName && (
            <Text style={styles.validationError}>
              {formik.errors.ownerName}
            </Text>
          )}

          <TextInput
            placeholder="Repository name"
            value={formik.values.repositoryName}
            onChangeText={formik.handleChange('repositoryName')}
            style={[
              styles.input,
              formik.touched.repositoryName && formik.errors.repositoryName
                ? styles.inputError
                : null,
            ]}
          />
          {formik.touched.repositoryName && formik.errors.repositoryName && (
            <Text style={styles.validationError}>
              {formik.errors.repositoryName}
            </Text>
          )}

          <TextInput
            placeholder="Rating between 0 and 100"
            inputMode="numeric"
            value={formik.values.rating}
            onChangeText={formik.handleChange('rating')}
            style={[
              styles.input,
              formik.touched.rating && formik.errors.rating
                ? styles.inputError
                : null,
            ]}
          />
          {formik.touched.rating && formik.errors.rating && (
            <Text style={styles.validationError}>{formik.errors.rating}</Text>
          )}

          <TextInput
            placeholder="Review"
            value={formik.values.text}
            onChangeText={formik.handleChange('text')}
            style={[
              styles.input,
              styles.textInput,
              formik.touched.text && formik.errors.text
                ? styles.inputError
                : null,
            ]}
            multiline
            numberOfLines={6}
          />
          {formik.touched.text && formik.errors.text && (
            <Text style={styles.validationError}>{formik.errors.text}</Text>
          )}

          <Pressable onPress={formik.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Create review</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview, result] = useCreateReview();
  const handleSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const createdReview = await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      navigate(`/repository/${createdReview.repository.id}`);
    } catch (error) {
      console.log(error);
      console.log(result.client.data);
    }
  };

  return <ReviewFormContainer onSubmit={handleSubmit} />;
};

export default ReviewForm;
