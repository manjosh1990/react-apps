import { useState, useEffect } from "react";
//API
import API from '../API';
//helpers
import { isPersitedState } from "../helpers";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0
};
export const useHomeFetch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);
            const movies = await API.fetchMovies(searchTerm, page);
            setState(prev => ({
                ...movies,
                results:
                    page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
            })
            );
        } catch (error) {
            setError(true);
            console.log(error);
        }
        setLoading(false);
    }
    //initial render
    useEffect(() => {
        fetchMovies(1);
    }, []);
    //search
    useEffect(() => {
        if(!searchTerm){
            const sessionState = isPersitedState('homeState');
            if(sessionState){
                setState(sessionState);
                return;
            }
        }
        setState(initialState);
        fetchMovies(1, searchTerm);
    }, [searchTerm]);

    //loadmore

    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1, searchTerm);
        setIsLoadingMore(false);
    }, [isLoadingMore, searchTerm, state.page])
//write to sessionStorage
    useEffect(()=>{
        if(!searchTerm){
            sessionStorage.setItem('homeState',JSON.stringify(state))
        }
    },[searchTerm,state])

    return { state, loading, error, setSearchTerm, searchTerm, setIsLoadingMore };
};
