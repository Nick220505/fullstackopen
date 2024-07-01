import { FlatList, Pressable, Text } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import ItemSeparator from '../ItemSeparator';
import ListFilter from './ListFilter';
import RepositoryItem from '../RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import ListTextFilter from './ListTextFilter';

export const RepositoryListContainer = ({ data, onEndReach }) => {
  const navigate = useNavigate();

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error, fetchMore } = useRepositories(
    selectedFilter,
    searchQuery
  );

  const onEndReach = () => {
    fetchMore();
  };

  if (error) {
    return <Text>Something went wrong</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <ListTextFilter setSearchQuery={setSearchQuery} />
      <ListFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <RepositoryListContainer data={data} onEndReach={onEndReach} />
    </>
  );
};

export default RepositoryList;
