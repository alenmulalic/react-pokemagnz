import { CalculateIndexes } from "../utils/calculateIndexes";
import { TOTAL_POKEMONS } from "./dto/pokeConstants";
import { Pokemon } from "./dto/pokemon";

export function initializeEmptyPokemonById() {
  return new Map<number, Pokemon>();
}

export function initializeEmptyPokemonByName() {
  return new Map<string, number>();
}

export function initializeEmptyPokeNames(): string[] {
  return [];
}

export async function getPokeNames() {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`,
    );

    const jsonResponse = await response.json();

    const pokeNames = jsonResponse.results.map((x) => {
      return x.name;
    });

    return pokeNames;
  } catch (err) {
    console.log("failed to fetch pokemon names");
  }
}

export async function getPokemon(pokemangz: string | number) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemangz}`,
    );

    const jsonResponse = await response.json();

    return new Pokemon(jsonResponse);
  } catch (err) {
    console.log("Cannot fetch pokemganz", err);
  }
}

export async function getPokemonMap(
  page: number,
  pokemon: Map<number, Pokemon>,
) {
  const indexes = CalculateIndexes(page);
  const arrayOfPromises: Promise<Pokemon | undefined>[] = [];

  for (let i = indexes.start; i < indexes.stop && i < TOTAL_POKEMONS; i++) {
    if (!pokemon.has(i)) {
      arrayOfPromises.push(getPokemon(i));
    }
  }

  const results = await Promise.all(arrayOfPromises);

  for (const poke of results) {
    if (poke) pokemon.set(poke.id, poke);
  }

  return pokemon;
}

export function getPokemanNameMap(
  pokemon: Map<number, Pokemon>,
): Map<string, number> {
  const pokeNameMap = new Map<string, number>();

  for (const [key, value] of pokemon.entries()) {
    pokeNameMap.set(value.name.toLowerCase(), key);
  }

  return pokeNameMap;
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
