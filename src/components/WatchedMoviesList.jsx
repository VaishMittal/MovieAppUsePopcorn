import React from 'react'
import WatchedMovie from './WatchedMovie'

function WatchedMoviesList({watched,onDeleteWtached}) {
  return (
    <ul className="list">
    {watched.map((movie) => (
     <WatchedMovie  key={movie.imdbID} movie={movie} onDeleteWtached={onDeleteWtached} />
    ))}
  </ul>
  )
}

export default WatchedMoviesList
