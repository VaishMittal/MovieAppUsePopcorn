import React from 'react'

function WatchedMovie({movie,onDeleteWtached}) {
  return (
    <li >
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>

      <button className='btn-delete' onClick={()=>onDeleteWtached(movie.imdbID)}>X</button>
    </div>
  </li>
  )
}

export default WatchedMovie
