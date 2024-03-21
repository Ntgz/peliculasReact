import React, { useEffect, useState, useRef, useCallback } from 'react'
import EnviarMovies from './components/Movies'
import MovieService from './services/movies'
import './App.css'
import useSearch from './hooks/UseSearch'
import debounce from "just-debounce-it";
// import { debounce } from 'lodash';


const App = () => {

   
    const inputRef = useRef(null)
    const [sort, setSort] = useState(false)
    const  {query,setQuery,error} = useSearch()
    const {responseMovies,getMovies} = MovieService(query,sort);

    const debouncedGetMovies = useCallback(
        debounce(queryDos => {
            console.log('debounces');
            getMovies(queryDos)
    
        }, 1000)
        , [getMovies]
    ) 

    const handleSubmit = (event) => {
        event.preventDefault()
        const inputEl = inputRef.current
        const value = inputEl.value
        console.log(value)
    }
    const handleSubmitJavascript = (event) => {
        event.preventDefault()
        console.log(query);
        getMovies(query)

        // const fields = Object.fromEntries(new window.FormData(event.target))
        // const {query} = Object.fromEntries(new window.FormData(event.target))
        // console.log({query})
    }

        // handle change para buscar mientras se va escribiendo
    // const handleChange = (event) => {
    //     const newSearch = event.target.value
    //     setQuery(newSearch)
    //     getMovies({ query: newSearch})
    //     // setQuery(event.target.value)
    // }
    // handle change para actualizar estado del campo para buscar
    // const handleChange = (event) => {
    //     setQuery(event.target.value)
    // }

    // handle change con libreria just-debounce-it
    const handleChange = (event) => {
        const newSearch = event.target.value
        setQuery(newSearch)
        debouncedGetMovies(newSearch)
    }

    const handleSort = () => {
        setSort(!sort)
    }

    

    return (
        <div className='page'>

            <header>
                <h1>Buscador de películas</h1>
                <form className='form' onSubmit={handleSubmitJavascript}>
                    {/* <input ref={inputRef} placeholder='Movies' /> */}
                    <input onChange={handleChange} value={query} name='query' placeholder='Movies' />
                    {/* <button onClick={handleSubmitJavascript} type='submit'>Buscar</button> */}
                    <input type="checkbox" onChange={handleSort} checked={sort}/>
                    <button type='submit'>Buscar</button>
           

                </form>
                {
                        error 
                        ?
                        <p style={{color:'red'}}>
                            {error}
                        </p>:null
                    }
            </header>
            <main>
                <EnviarMovies movies={responseMovies}/>
            </main>
        </div>
    )
}

export default App