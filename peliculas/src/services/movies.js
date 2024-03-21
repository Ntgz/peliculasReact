import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const MovieService = (query, sort) => {
    const [responseMovies, setResponseMovies] = useState([]);
    const savePrevious = useRef(query)

    // useEffect(() => {
    //     fetchMovies();
    // }, []);

    const fetchMovies = () => {
        fetch("https://www.omdbapi.com/?apikey=4287ad07&s=Avengers")
            .then(response => response.json())
            .then(data => {
                if (data.Search) {
                    setResponseMovies(data.Search);
                }
            })
            .catch(error => console.error('Error fetching movies:', error));
    };

    // const getMovies = useMemo(() => {
    //     return async query => {
    //      if (query === savePrevious.current) return 
    //     else {

    //         if (query) {
    //             // setResponseMovies(responseMovies)
    //             fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${query}`)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     if (data.Search) {
    //                         savePrevious.current = query
    //                         setResponseMovies(data.Search);
    //                     }
    //                 })
    //                 .catch(error => console.error('Error fetching movies:', error));
    //         } else {
    //             setResponseMovies([])
    //         }

    //     }
    // }
    // },[])

    const getMovies = useCallback(async query => {
        //  if (query === savePrevious.current) return 
        // else {

            if (query) {
                // setResponseMovies(responseMovies)
                fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${query}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.Search) {
                            savePrevious.current = query
                            setResponseMovies(data.Search);
                        }
                    })
                    .catch(error => console.error('Error fetching movies:', error));
            } else {
                setResponseMovies([])
            }

        
    },
    [])


    // const sortedMovies = sort
    //     ? [...responseMovies].sort((a, b) => a.Title.localeCompare(b.Title))
    //     : responseMovies

    const sortedMovies = useMemo(() => {
        return sort
            ? [...responseMovies].sort((a, b) => a.Title.localeCompare(b.Title))
            : responseMovies

    },[sort,responseMovies])



    

    return { responseMovies: sortedMovies, getMovies };
};


export default MovieService;