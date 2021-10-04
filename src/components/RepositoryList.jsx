import React, { useState, useEffect, useRef } from 'react';
import { FlatList, View, StyleSheet, Pressable, Dimensions } from 'react-native';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { Menu, Provider, Searchbar } from 'react-native-paper';
import Text from './Text';
import { Ionicons } from '@expo/vector-icons';
import { useDebouncedCallback } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MenuButton = ({ text, onPress }) => (
  <Pressable onPress={onPress} style={styles.menuButton}>
    <Text fontWeight='medium' style={{ letterSpacing:-0.5 }}>
      {text}
    </Text>
    <Ionicons name='caret-down' />
  </Pressable>
);

const RepositoryListHeader = ({ search, onSearch, setRepoVars, repoVars }) => {
  const [buttonText, setButtonText] = useState('Latest Repositories');
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Searchbar
        value={search}
        placeholder='Search repositories'
        onChangeText={onSearch}
      />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<MenuButton text={buttonText} onPress={openMenu} />}>
        <Menu.Item disabled title='Select an item...' />
        <Menu.Item onPress={() => {
          setRepoVars({ ...repoVars, orderBy: 'CREATED_AT', orderDirection: 'DESC' });
          setButtonText('Latest Repositories');
          setVisible(false);
          }} title="Latest Repositories" />
        <Menu.Item onPress={() => {
          setRepoVars({ ...repoVars, orderBy: 'RATING_AVERAGE', orderDirection: 'DESC'});
          setButtonText('Highest Rated');
          setVisible(false);
          }} title="Highest Rated" />
          <Menu.Item onPress={() => {
          setRepoVars({ ...repoVars, orderBy: 'RATING_AVERAGE', orderDirection: 'ASC'});
          setButtonText('Lowest Rated');
          setVisible(false);
          }} title="Lowest Rated" />
        </Menu>
      </View>
  );
};

export const RepositoryListContainer = ({ repositories, search, onSearch, repoVars, setRepoVars, onEndReached }) => {
  const dim = Dimensions.get('window');
  console.log('dim', dim);
  
  return (
      <View style={{ flex: 1, height: dim.height }}>
      <FlatList
        data={repositories}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.fullName}
        renderItem={({ item }) => (
          <RepositoryItem item={item} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={<RepositoryListHeader
          search={search}
          onSearch={onSearch}
          repoVars={repoVars}
          setRepoVars={setRepoVars}
          />}
      />
      </View>
    ); 
};

const RepositoryList = () => {
  const [repoVars, setRepoVars] = useState({ first: 8 });
  const { repositories, loading, fetchMore } = useRepositories(repoVars);
  const mounted = useRef(false);

  const [search, setSearch] = useState('');
  const debounced = useDebouncedCallback(
    (value) => {
      setRepoVars({...repoVars, searchKeyword: value});
    },
    500
  );

  useEffect(() => {
    mounted.current = true;

    return () => {
        mounted.current = false;
    };
}, []);

  if (loading) {
    return null;
  }

  const onEndReached = () => {
    fetchMore();
  };

  const onSearch = (value) => {
    setSearch(value);
    debounced(value);
  };

  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  return (
    <Provider>      
      <RepositoryListContainer
        repositories={repositoryNodes}
        onSearch={onSearch}
        search={search}
        repoVars={repoVars}
        setRepoVars={setRepoVars}
        onEndReached={onEndReached}
        />
    </Provider>
  ); 
};

export default RepositoryList;