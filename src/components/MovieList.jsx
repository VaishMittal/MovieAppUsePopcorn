// import React, { useState } from 'react'
import Movie from './Movie';



function MovieList({movies,onSelectMovie}) {
        // const [movies, setMovies] = useState(tempMovieData);
    
  return (
    <ul className="list list-movies">
              {movies?.map((movie) => (
               <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
              ))}
            </ul>
  )
}

export default MovieList
