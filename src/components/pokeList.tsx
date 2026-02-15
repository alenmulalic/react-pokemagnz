import type { Pokemon } from "../data/dto/pokemon";
import PokeDexListObject from "./pokelistObject";

export default function PokeList(props: {
  pokeList: Pokemon[];
  showDetails: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {props.pokeList.map((poke) => (
        <PokeDexListObject
          key={poke.id}
          pokemon={poke}
          showDetails={props.showDetails}
        ></PokeDexListObject>
      ))}
    </div>
  );
}
