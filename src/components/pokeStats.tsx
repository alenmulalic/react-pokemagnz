import { Pokemon } from "../data/dto/pokemon";
import PokeTypeImages from "./pokeTypesImg";

export default function PokeStats(props: {
  pokemon: Pokemon | undefined;
  back: () => void;
}) {
  return (
    <>
      {props.pokemon ? (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-800 p-8 space-y-8">
          <div className="flex justify-center">
            <img
              src={props.pokemon.sprites.front_default}
              alt="Main"
              className="w-32 h-32 object-contain"
            />
            <img
              src={props.pokemon.sprites.front_shiny}
              alt="Main"
              className="w-32 h-32 object-contain"
            />
          </div>

          <div className="flex items-center justify-between space-x-4">
            <div>
              <span className="block text-lg font-bold">
                {props.pokemon.name}
              </span>
              <span className="block text-gray-500">
                Dex Id: {props.pokemon.id}
              </span>
            </div>
            <PokeTypeImages types={props.pokemon.types}></PokeTypeImages>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <span className="text-sm text-gray-700">
              HP: {props.pokemon.hp}
            </span>
            <span className="text-sm text-gray-700">
              Attack: {props.pokemon.attack}
            </span>
            <span className="text-sm text-gray-700">
              Defense: {props.pokemon.defense}
            </span>
            <span className="text-sm text-gray-700">
              Sp. Attack: {props.pokemon.special_attack}
            </span>
            <span className="text-sm text-gray-700">
              Sp. Defense: {props.pokemon.special_defense}
            </span>
            <span className="text-sm text-gray-700">
              Speed: {props.pokemon.speed}
            </span>
          </div>

          {/* Section 4: Add your content here */}
          <div className="text-center text-gray-500 text-sm">
            <button
              type="button"
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
              onClick={props.back}
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
