import React, { useState, useEffect } from 'react';

function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setPokemon(data);
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-w-50vw min-h-fit mt-7 bg-gray-100">
      <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden flex flex-col p-4">
        <img
          className="w-50 h-48 object-cover mx-auto"
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />
        <h3 className="text-xl font-bold text-center mt-4 capitalize">{pokemon.name}</h3>
        <div className="flex flex-wrap justify-center mt-2">
          <div className="text-center m-2">
            <span className="block font-semibold">Height</span>
            <span>{pokemon.height / 10} m</span>
          </div>
          <div className="text-center m-2">
            <span className="block font-semibold">Weight</span>
            <span>{pokemon.weight / 10} kg</span>
          </div>
          <div className="text-center m-2">
            <span className="block font-semibold">Type</span>
            <span className="capitalize">{pokemon.types.map(type => type.type.name).join(', ')}</span>
          </div>
          <div className="text-center m-2">
            <span className="block font-semibold">Abilities</span>
            <span className="capitalize">{pokemon.abilities.map(ability => ability.ability.name).join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
