import { ListItem } from "@rneui/themed";
import { Link } from "expo-router";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";

import { fetchPokemonList } from "../helpers/api";
import { capitalizeFirstLetter } from "../helpers/utils";

export default function PokedexList() {
  const { data, isLoading } = useQuery("pokedex-list", fetchPokemonList);

  const renderItem = ({ item }) => (
    <Link
      href={{ pathname: "/pokemon/[id]", params: { id: item.name } }}
      asChild
    >
      <TouchableOpacity>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{capitalizeFirstLetter(item.name)}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    </Link>
  );

  let content;

  if (isLoading) {
    content = <Text>Loading...</Text>;
  } else {
    content = (
      <FlatList
        data={data.results}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 120,
  },
});
