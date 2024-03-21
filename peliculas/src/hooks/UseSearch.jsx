import React, { useEffect, useState, useRef } from 'react'

const useSearch = () => {

    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
    const fisrstInput = useRef(true)
    useEffect(() => {
        if(fisrstInput.current){
            fisrstInput.current = query === ''
            return
        }

        if(query === ''){
            setError('No se puede buscar una película vacía')
            return
        }
        if(query.length <3 ){
            setError('La búsqueda debe tener al menios 3 caracteres')
            return
        }
        
        setError(null)
    }, [query])

    return {query,setQuery,error}

}
export default useSearch;