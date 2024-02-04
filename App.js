import { Header, ListItem } from "@rneui/themed";
import { useEffect, useState } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { fetchPokemonList } from "./helpers/fetchPokemonList";

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemonList().then((data) => {
      console.log(data);
      setPokemonData(data);
      setIsLoading(false);
    });
  }, []); // Only fetch once when the component mounts

  // console.log("pokemon data:", pokemonData.results[0]);

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  let content;

  if (isLoading) {
    content = <Text>Loading...</Text>;
  } else {
    content = (
      <FlatList
        data={pokemonData.results}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <Header
        centerComponent={{
          text: "Pokedex Mobile",
          style: styles.heading,
        }}
      />
      <View style={styles.container}>{content}</View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});
