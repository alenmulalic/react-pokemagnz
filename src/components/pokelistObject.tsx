import { useState } from "react";
import type { Pokemon } from "../data/dto/pokemon";
import PokeTypeImages from "./pokeTypesImg";

export default function PokeDexListObject(props: {
  pokemon: Pokemon;
  showDetails: (id: number) => void;
}) {
  const [pokemon, _setPokemon] = useState(props.pokemon);

  return (
    <div
      className="flex items-center space-x-4 p-4 bg-white border-2 border-gray-300 rounded shadow"
      onClick={() => {
        props.showDetails(pokemon.id);
      }}
    >
      <span className="w-20 text-gray-700 font-medium">
        Dex Id: {pokemon.id}
      </span>
      <img
        src={pokemon.sprites.front_default}
        alt="Pokemon"
        className="w-20 h-20 object-contain"
      />
      <span className="w-32 text-gray-700 font-medium">{pokemon.name}</span>
      <PokeTypeImages types={pokemon.types}></PokeTypeImages>
    </div>
  );
}
