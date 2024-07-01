import { StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
});

const ListFilter = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <Picker
      selectedValue={selectedFilter}
      onValueChange={(itemValue, _itemIndex) => setSelectedFilter(itemValue)}
      style={styles.container}
    >
      <Picker.Item
        label="Select an item..."
        enabled={false}
        color={theme.colors.textSecondary}
      />
      <Picker.Item label="Latest repositories" value="lr" />
      <Picker.Item label="Highest rated repositories" value="hrr" />
      <Picker.Item label="Lowest rated repositories" value="lrr" />
    </Picker>
  );
};

export default ListFilter;
