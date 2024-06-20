import {
    useInfiniteQuery,
} from '@tanstack/react-query';
import { getPokemonList } from '../api/pokemonApi';
import PokemonCard from './PokemonCard';


const PokemonList = () => {

    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['pokemonList'],
        queryFn: ({ pageParam }) => getPokemonList(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage.next) return undefined;
            return { offset: parseInt(lastPage.next.split('offset=')[1], 10) }; // Extract offset from next url
        },
    });

    return (
        <div className="flex flex-col">
            <div className="sticky top-0 px-4 py-2 flex justify-between items-center z-10">
                <p className="text-xl text-center">Total Pokemons: {data?.pages[0]?.count}</p>
                <p className="text-5xl text-center mb-10">Pokemon Infinite scroll</p>
            </div>
            {isLoading && (
                <p className="text-xl  text-center">Loading...</p>
            )}
            {error && (
                <>
                    <p className="text-xl  text-center">Error Occured...</p>
                    <p className="text-xl  text-center">{error.message}</p>
                </>
            )}
            {data && (
                <>
                    {data.pages[0].results.map(
                        ({ name, url }, index) => (
                            <PokemonCard key={`${index}-${name}`} url={url} />
                        )
                    )}
                    {hasNextPage && (
                        <button onClick={fetchNextPage} className="text-center mt-10">
                            Load More
                        </button>
                    )}
                </>
            )}
        </div>
    );
}

export default PokemonList;