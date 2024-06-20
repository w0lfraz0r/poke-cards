const baseUrl = 'https://pokeapi.co/api/v2';

export async function fetchPokemon(url) {
    const response = await fetch(`${baseUrl}${url}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon data: ${response.statusText}`);
    }
    return await response.json();
}

/**
 * will return
 * "count": 1302,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  "previous": null,
  "results": [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    }]
 */
export async function getPokemonList(page = 0, limit = 20) {
    const url = `/pokemon?offset=${page * limit}&limit=${limit}`;
    return await fetchPokemon(url);
}