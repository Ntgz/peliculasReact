import React, { useState, useEffect } from 'react';
import MovieService from "../services/movies";




const RenderMovies = ({movies}) => {
console.log('movies--------------------',movies);
    
    return (

        <ul className='movies'>
            {
                movies.map((e, i) => (
                    <li className='movie' key={e.imdbID}>
                        <p>{e.Title}</p>
                        <p>{e.Year}</p>
                        <img src={e.Poster} alt={e.Title} />
                    </li>
                )
                )
            }
        </ul>
    )

}

const NoMovies = () =>{
    return (
        <p>No se encontraron peliculas</p>
    )
}

const EnviarMovies = ({movies}) =>{
    const hasMovies = movies.length > 0


    return (
        hasMovies ?
        <RenderMovies movies={movies}/>:
        <NoMovies/>
    )
}


export default EnviarMovies;