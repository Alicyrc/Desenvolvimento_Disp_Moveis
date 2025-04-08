import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Buscar a lista de pokémons
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
        const data = await res.json();
        setPokemons(data.results);
      } catch (error) {
        console.error('Erro ao carregar lista de pokémons:', error);
      } finally {
        setLoadingList(false);
      }
    };

    fetchPokemons();
  }, []);

  // Buscar detalhes de um pokémon clicado
  const fetchPokemonDetails = async (url) => {
    try {
      setLoadingDetails(true);
      const res = await fetch(url);
      const data = await res.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error('Erro ao carregar detalhes do pokémon:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => fetchPokemonDetails(item.url)}
    >
      <Text style={styles.itemText}>{item.name.toUpperCase()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loadingList ? (
        <ActivityIndicator size="large" color="#FFA500" />
      ) : (
        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          style={styles.list}
        />
      )}

      {loadingDetails ? (
        <ActivityIndicator size="large" color="#00BFFF" />
      ) : selectedPokemon && (
        <ScrollView style={styles.detailsContainer}>
          <Text style={styles.title}>{selectedPokemon.name.toUpperCase()}</Text>
          <Image
            source={{ uri: selectedPokemon.sprites.front_default }}
            style={styles.image}
          />
          <Text>Altura: {selectedPokemon.height}</Text>
          <Text>Peso: {selectedPokemon.weight}</Text>
          <Text>Tipo(s): {selectedPokemon.types.map(t => t.type.name).join(', ')}</Text>
          <Text>Habilidades:</Text>
          {selectedPokemon.abilities.map((ab, index) => (
            <Text key={index}>• {ab.ability.name}</Text>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  list: {
    maxHeight: 300,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 16,
  },
  detailsContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

export default PokemonList;