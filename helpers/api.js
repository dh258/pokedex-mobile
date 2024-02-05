import axios from "axios";

export async function fetchPokemonDetail(name) {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
}

export async function fetchPokemonList() {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return response.data;
}
