import { useState, useEffect } from "react";
import Header from "./components/header";
import Pagination from "./components/pagination";
import PokeList from "./components/pokeList";
import PokeStats from "./components/pokeStats";
import SearchBar from "./components/searchBar";
import { TOTAL_POKEMONS, MAX_PAGES } from "./data/dto/pokeConstants";
import type { Pokemon } from "./data/dto/pokemon";
import {
  initializeEmptyPokemon,
  getPokemonMap,
  getPokemonList,
  getPokemon,
} from "./data/pokeApiCalls";

function App() {
  const [pokemons, setPokemons] = useState(initializeEmptyPokemon);
  const [pokeList, setPokeList] = useState([] as Pokemon[]);
  const [page, setPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(0);

  useEffect(() => {
    async function fetchPokemonList() {
      const data = await getPokemonMap(page, pokemons);
      const pokelist = getPokemonList(page, data);

      setPokemons(data);
      setPokeList(pokelist);
    }

    fetchPokemonList();
  }, [page]);

  function showPokemonDetails(id: number) {
    setShowDetails(!showDetails);
    setSelectedPoke(id);
  }

  function returnToList() {
    setShowDetails(false);
  }

  function changePage(val: number) {
    setPage(val);
  }

  async function search(val: string) {
    if (!isNaN(Number(val))) {
      const id = Number(val);

      if (id < 1 || id > TOTAL_POKEMONS) {
        setShowDetails(false);

        return;
      }

      const poke = pokemons.get(id);

      if (!poke) {
        const pokeMon = await getPokemon(id);
        if (!pokeMon) {
          setShowDetails(false);
          return;
        }

        setPokemons((prev) => {
          const newMap = new Map(prev);
          newMap.set(id, pokeMon);
          return newMap;
        });
      }

      setShowDetails(true);
      setSelectedPoke(id);
    }

    for (const [key, value] of pokemons.entries()) {
      const pokeName = value.name.toLowerCase();
      if (pokeName === val.toLowerCase()) {
        setShowDetails(true);
        setSelectedPoke(key);
      }
    }
  }

  return (
    <>
      <Header></Header>
      <SearchBar search={search}></SearchBar>
      {!showDetails ? (
        <>
          <PokeList
            pokeList={pokeList}
            showDetails={showPokemonDetails}
          ></PokeList>

          <Pagination
            n={MAX_PAGES}
            value={page}
            onChange={changePage}
          ></Pagination>
        </>
      ) : (
        <PokeStats
          pokemon={pokemons.get(selectedPoke)}
          back={returnToList}
        ></PokeStats>
      )}
    </>
  );
}
export default App;
