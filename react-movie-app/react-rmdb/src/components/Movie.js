import React from "react";
import { useParams } from 'react-router-dom';
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config'

//components
import Grid from './Grid';
import Spinner from './Spinner';
import BreadCrumb from "./BreadCrumb";
import MovieInfo from "./MovieInfo";
import MovieInfoBar from "./MovieInfoBar";
import Actor from "./Actor";
//hook
import { useMovieFetch } from "../hooks/useMovieFetch";
//Image
import NoImage from '../images/no_image.jpg';

const Movie = () => {
    const { movieId } = useParams();
    console.log("movieId :" + movieId);

    const { state: movie, loading, error } = useMovieFetch(movieId);
    if (loading) return <Spinner></Spinner>;
    if (error) return <div>Something went wrong!</div>
    return (<>
        <div>
            <BreadCrumb movieTitle={movie.original_title}></BreadCrumb>
            <MovieInfo movie={movie}></MovieInfo>
            <MovieInfoBar time={movie.runtime} budget={movie.budget} revenue={movie.revenue}></MovieInfoBar>
            <Grid 
                header='Actors'>
                    {movie.actors.map(actor =>(
                        <Actor
                            key={actor.credit_id}
                            name={actor.name}
                            character={actor.character}
                            imageUrl ={
                                actor.profile_path?`${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : NoImage
                            }
                        />
                    ))}
                </Grid>
        </div>
    </>)
};
export default Movie;