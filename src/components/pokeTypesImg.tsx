import bug from "../assets/bug.png";
import dark from "../assets/dark.png";
import dragon from "../assets/dragon.png";
import electric from "../assets/electric.png";
import fairy from "../assets/fairy.png";
import fighting from "../assets/fighting.png";
import fire from "../assets/fire.png";
import flying from "../assets/flying.png";
import ghost from "../assets/ghost.png";
import grass from "../assets/grass.png";
import ground from "../assets/ground.png";
import ice from "../assets/ice.png";
import normal from "../assets/normal.png";
import poison from "../assets/poison.png";
import psychic from "../assets/psychic.png";
import rock from "../assets/rock.png";
import steel from "../assets/steel.png";
import water from "../assets/water.png";
import type { PokeTypes } from "../data/dto/poke.response";

const TypeMap: Record<string, string> = {
  bug: bug,
  dark: dark,
  dragon: dragon,
  electric: electric,
  fairy: fairy,
  fighting: fighting,
  fire: fire,
  ghost: ghost,
  grass: grass,
  ground: ground,
  ice: ice,
  normal: normal,
  poison: poison,
  psychic: psychic,
  rock: rock,
  steel: steel,
  water: water,
  flying: flying,
};

export default function PokeTypeImages(props: { types: PokeTypes[] }) {
  return (
    <>
      {props.types.length > 1 ? (
        <>
          <img
            src={TypeMap[props.types[0].type.name]}
            alt="Pokemon"
            className="w-10 h-10 object-contain"
          />
          <img
            src={TypeMap[props.types[1].type.name]}
            alt="Pokemon"
            className="w-10 h-10 object-contain"
          />
        </>
      ) : (
        <img
          src={TypeMap[props.types[0].type.name]}
          alt="Pokemon"
          className="w-10 h-10 object-contain"
        />
      )}
    </>
  );
}
