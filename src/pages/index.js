import { useState } from "react";
import { useGlobalContext } from "@/context/global";
import Router from "next/router";

export default function Home() {
  const {
    allPokemonData,
    searchResults,
    next,
    getPokemon,
    loading,
    realTimeSearch,
  } = useGlobalContext();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);

    realTimeSearch(search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => {
      return (
        <div
          key={pokemon.id}
          onClick={() => {
            Router.push(`/pokemon/${pokemon.name}`);
          }}
          className="pokemon-name"
        >
          {pokemon.name}
        </div>
      );
    });
  };

  return (
    <main>
      <form action="" className="search-form" onSubmit={handleSearch}>
        <div className="input-control">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search for a Pokemon..."
          />
          {/* <button className="submit-btn" type="submit">
            Search
          </button> */}
          <select name="cars" className="cars">
                    <option value="Type">Type</option>
                    <option value="grass">grass</option>
                    <option value="poison">poison</option>
                    <option value="fire">fire</option>
                    <option value="water">water</option>
                    <option value="flying">flying</option>
                    <option value="bug">bug</option>
                </select>

        </div>
      </form>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

      <div className="all-pokemon">
        {allPokemonData ? (
          allPokemonData.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="card"
                onClick={() => {
                  Router.push(`/pokemon/${pokemon.name}`);
                }}
              >
                <div className="card-image">
                  {/* <img
                    src={pokemon.sprites.other.home.front_shiny}
                    alt={pokemon.name}
                  /> */}
                   <img
                    src="https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/1.svg"
                    alt={pokemon.name}
                  /> 
                </div>
                <div className="card-body">
                  <h3>{pokemon.name}</h3>
                  <h3>#0{pokemon.id}</h3>
                  
                  <p>Click Me &nbsp; &rarr;</p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      <div className="next">
        {allPokemonData.length > 0 && (
          <button className="next-btn" onClick={next}>
            Load More &darr;
          </button>
        )}
      </div>
    </main>
  );
}