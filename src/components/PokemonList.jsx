import {
    useInfiniteQuery,
} from '@tanstack/react-query';
import { getPokemonList } from '../api/pokemonApi';
import PokemonCard from './PokemonCard';
import { useEffect, useRef } from 'react';

const PokemonList = () => {
    const {
        data,
        error,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['pokemonList'],
        queryFn: ({ pageParam }) => getPokemonList(pageParam.offset, pageParam.limit),
        initialPageParam: { offset: 0, limit: 10 },
        getNextPageParam: (lastPage) => {
            if (!lastPage.next) return undefined;
            const urlObject = new URL(lastPage.next);
            const searchParams = urlObject.searchParams;
            const offset = parseInt(searchParams.get("offset"));
            const limit = parseInt(searchParams.get("limit"));
            return { offset, limit };
        },
    });

    const loadMoreRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: '20px',
                threshold: 1.0,
            }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [loadMoreRef, hasNextPage, fetchNextPage]);

    return (
        <div className="flex flex-col">
            <div className="sticky top-0 px-4 py-2 flex justify-between items-center z-10">
                <p className="text-xl text-center">Total Pokemons: {data?.pages[0]?.count}</p>
                <p className="text-5xl text-center mb-10">Pokemon Infinite Scroll</p>
            </div>
            {isLoading && (
                <p className="text-xl text-center">Loading...</p>
            )}
            {error && (
                <>
                    <p className="text-xl text-center">Error Occurred...</p>
                    <p className="text-xl text-center">{error.message}</p>
                </>
            )}
            {data && (
                <>
                    {data.pages.map((page, pageIndex) => (
                        page.results.map(({ name, url }, index) => (
                            <PokemonCard key={`${pageIndex}-${index}-${name}`} url={url} />
                        ))
                    ))}
                    <div ref={loadMoreRef} className="text-xl text-center mt-10">
                        {hasNextPage ? 'Loading more...' : 'No more Pokémon'}
                    </div>
                </>
            )}
        </div>
    );
}

export default PokemonList;
