import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { fetchPokemonList } from "./helpers/fetchPokemonList";
import { useEffect, useState } from "react";

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    setPokemonData(fetchPokemonList());
  }, []); // Only fetch once when the component mounts

  console.log("pokemon data:", pokemonData);

  return (
    <View>
      {/* Display a loading indicator while data is being fetched */}
      {pokemonData === null && <Text>Loading...</Text>}

      {/* Render the Pokémon data when available */}
      {pokemonData && (
        <Text>Fetched Pokémon data: {JSON.stringify(pokemonData)}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
