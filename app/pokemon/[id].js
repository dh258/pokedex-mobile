import { Button, Image } from "@rneui/themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";

import { fetchPokemonDetail } from "../../helpers/api";
import { POKEMON_TYPES_COLOR } from "../../helpers/colors";
import { capitalizeFirstLetter } from "../../helpers/utils";

export default function PokemonDetail() {
  const params = useLocalSearchParams();
  const pokemonId = params.id;

  const { data, isLoading } = useQuery(["pokedex-detail", pokemonId], () =>
    fetchPokemonDetail(pokemonId),
  );

  if (isLoading) {
    return (
      <View>
        <Text>Loading Pokemon detail...</Text>
      </View>
    );
  }

  const pokemonImg = data.sprites.other.home.front_default;
  const id = data.id;
  const name = data.name;
  const types = data.types;

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemonImg }} style={styles.image} />
      <Text style={styles.id}>#{id}</Text>
      <Text style={styles.name}>{capitalizeFirstLetter(name)}</Text>
      {types.map((type, index) => (
        <Button
          key={index}
          title={type.type.name}
          buttonStyle={{
            ...styles.type,
            backgroundColor: POKEMON_TYPES_COLOR[type.type.name],
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 16,
  },
  id: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  name: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    marginTop: 8,
    borderRadius: 3,
  },
});
