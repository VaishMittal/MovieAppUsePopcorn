import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import MovieList from "./components/MovieList";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import MovieDetail from "./components/MovieDetail";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];


const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];



const key="6cd14023"
// let query="interstellar"

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoader,setIsLoader] = useState(true);
  const [error,setError] = useState("");
  const [selectedId,setSelectedId] = useState(null);

  function handleSelectMovie(id){
    setSelectedId( selectedId => id === selectedId ? null : id);
  }

  function handleCloseMovie(id){
    setSelectedId(null)
  }

  function handleAddWatched(movie){
    setWatched((watched) => [...watched,movie]);
  }

  function handleDeletedWatched(id){
    setWatched((watched)=>watched.filter((movie)=>movie.imdbID !== id));
  }


  useEffect(function(){
    const controller = new AbortController();
    async function fetchMovies(){
      try{
        setIsLoader(true)
        setError("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal:controller.signal});

        if(!res.ok) throw new Error("Something went wrong with fetching movies")

        const data = await res.json();

        if(data.Response === "False") throw new Error("Movies not found");
        setMovies(data.Search);
        setError("");

      }catch(err){
        console.log(err.message);
        if(err.name !== "AbortError"){
          setError(err.message);
        }
      }finally{
        setIsLoader(false) 
      }
    }

    if(query.length <3){
      setMovies([]);
      setError("");
      return;
    }

    handleCloseMovie();
    fetchMovies();
    return function(){
      controller.abort();
    }  
  },[query])
 
  return (
    <>
    
    <Navbar>
       <Search query={query} setQuery={setQuery} />
       <NumResults movies={movies} />
    </Navbar>
    <Main>
        <Box> 
          {isLoader &&<Loader/> }
          {!isLoader && !error &&  <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
          {error && <ErrorMessage message={error} />}

        </Box>
        <Box>
         { selectedId ? 
         (<MovieDetail 
          selectedId={selectedId} 
          onCloseMovie={handleCloseMovie}
          handleAddWatched={handleAddWatched}
          watched={watched}
           />) :
         <>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList  watched={watched} onDeleteWtached={handleDeletedWatched} />
          </>}
        </Box>
    </Main>
    
    </>
  );
}

function ErrorMessage({message}){
  return <p className="error">{message}<span>❗</span></p>
}
