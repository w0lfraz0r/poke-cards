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
    <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col p-4">
      <img
        className="w-50 h-48 object-cover mx-auto"
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <h3 className="text-xl font-bold text-center mt-4">{pokemon.name}</h3>
      <div className="flex flex-wrap justify-center mt-2">
        {/* Display other pokemon data here later*/}
      </div>
    </div>
  );
}

export default PokemonCard;
