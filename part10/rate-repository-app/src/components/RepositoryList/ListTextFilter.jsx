import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginBottom: 5,
  },
});

const ListTextFilter = ({ setSearchQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const debouncedQueryUpdate = useDebouncedCallback((value) => {
    setSearchQuery(value);
  }, 500);

  const handleTextChange = (value) => {
    setInputValue(value);
    debouncedQueryUpdate(value);
  };

  return (
    <Searchbar
      placeholder="Filter Repositories"
      value={inputValue}
      onChangeText={handleTextChange}
      style={styles.container}
    />
  );
};

export default ListTextFilter;
