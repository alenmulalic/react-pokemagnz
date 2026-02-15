import { CalculateIndexes, type Indexes } from "../utils/calculateIndexes";
import { Pokemon } from "./dto/pokemon";

export function initializeEmptyPokemon() {
  return new Map<number, Pokemon>();
}

export async function getPokemon(pokemangz: string | number) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemangz}`,
    );

    let jsonResponse;

    try {
      jsonResponse = await response.json();

      return new Pokemon(jsonResponse);
    } catch (err) {
      console.log("Pokemangz not found", pokemangz);
    }
  } catch (err) {
    console.log("Cannot fetch pokemganz", err);
  }
}

export async function getPokemonMap(
  page: number,
  pokemon: Map<number, Pokemon>,
) {
  const indexes = CalculateIndexes(page);

  for (let i = indexes.start; i < indexes.stop; i++) {
    if (!pokemon.has(i)) {
      const poke = await getPokemon(i);
      if (poke) pokemon.set(i, poke);
    }
  }

  return pokemon;
}

export function getPokemonList(page: number, pokemon: Map<number, Pokemon>) {
  const indexes = CalculateIndexes(page);
  const pokeList: Pokemon[] = [];

  for (let i = indexes.start; i < indexes.stop; i++) {
    const poke = pokemon.get(i);
    if (poke) pokeList.push(poke);
  }

  return pokeList;
}
