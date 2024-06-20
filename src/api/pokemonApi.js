const baseUrl = 'https://pokeapi.co/api/v2';

export async function fetchPokemon(url) {
    const response = await fetch(`${baseUrl}${url}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch Pokemon data: ${response.statusText}`);
    }
    return await response.json();
}

export async function getPokemonList(offset = 0, limit = 20) {
  console.log('Inside function',offset,limit);
    const url = `/pokemon?offset=${offset}&limit=${limit}`;
    return await fetchPokemon(url);
}