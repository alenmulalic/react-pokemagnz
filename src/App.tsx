import { useState, useEffect } from "react";
import Header from "./components/header";
import Pagination from "./components/pagination";
import PokeList from "./components/pokeList";
import PokeStats from "./components/pokeStats";
import SearchBar from "./components/searchBar";
import { TOTAL_POKEMONS, MAX_PAGES, PAGE_SIZE } from "./data/dto/pokeConstants";
import type { Pokemon } from "./data/dto/pokemon";
import {
  initializeEmptyPokemonById,
  getPokemonMap,
  getPokemonList,
  getPokemon,
  initializeEmptyPokeNames,
  getPokeNames,
  getPokemanNameMap,
  initializeEmptyPokemonByName,
} from "./data/pokeApiCalls";
import fuzzysort from "fuzzysort";

function App() {
  const [pokeNames, setPokeNames] = useState(initializeEmptyPokeNames());
  const [recalculatePokeNames, setRecalculatePokeNames] = useState(false);
  const [pokemonById, setPokemonById] = useState(initializeEmptyPokemonById);
  const [pokemonByName, setPokemonByName] = useState(
    initializeEmptyPokemonByName,
  );
  const [pokeList, setPokeList] = useState([] as Pokemon[]);
  const [page, setPage] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPoke, setSelectedPoke] = useState(0);

  useEffect(() => {
    async function fetchPokeNames() {
      const pokeNames = await getPokeNames();
      setPokeNames(pokeNames);
    }

    fetchPokeNames();
  }, [recalculatePokeNames]);

  useEffect(() => {
    async function fetchPokemonList() {
      const data = await getPokemonMap(page, pokemonById);
      const nameMap = getPokemanNameMap(data);
      const pokelist = getPokemonList(page, data);

      setPokemonById(data);
      setPokemonByName(nameMap);
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

      const poke = pokemonById.get(id);

      if (!poke) {
        const pokeMon = await getPokemon(id);
        if (!pokeMon) {
          setShowDetails(false);
          return;
        }

        setPokemonById((prev) => {
          const newMap = new Map(prev);
          newMap.set(id, pokeMon);
          return newMap;
        });
      }

      setShowDetails(true);
      setSelectedPoke(id);
    }

    const results = fuzzysort.go(val, pokeNames);
    const fuzzyPokes: string[] = [];
    let i = 0;
    while (i < results.length && i < PAGE_SIZE) {
      fuzzyPokes.push(results[i].target);
      i++;
    }

    const newPokeList: Pokemon[] = [];
    const newMapById = new Map(pokemonById);
    const newMapByName = new Map(pokemonByName);

    const arrayOfPromises: Promise<Pokemon | undefined>[] = [];

    for (const fuzzyPoke of fuzzyPokes) {
      const poke = pokemonById.get(
        pokemonByName.get(fuzzyPoke.toLowerCase()) ?? 0,
      );

      if (poke) {
        newPokeList.push(poke);
      } else {
        arrayOfPromises.push(getPokemon(fuzzyPoke));
      }
    }

    const promiseResult = await Promise.all(arrayOfPromises);

    for (const res of promiseResult) {
      if (res) {
        newMapById.set(res.id, res);
        newMapByName.set(res.name.toLowerCase(), res.id);
        newPokeList.push(res);
      }
    }

    setPokemonByName(newMapByName);
    setPokemonById(newMapById);
    setPokeList(newPokeList);
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
          pokemon={pokemonById.get(selectedPoke)}
          back={returnToList}
        ></PokeStats>
      )}
    </>
  );
}
export default App;
