import { useState } from "react";
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
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";



// const key="6cd14023"
// let query="interstellar"

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId,setSelectedId] = useState(null);

  // const [watched, setWatched] = useState(function(){
  //   const storedValue = localStorage.getItem("watched");
  //   return storedValue ?  JSON.parse(storedValue) : [];
  // });

  const {error,isLoader,movies} = useMovies(query);

 const [watched,setWatched] = useLocalStorageState("watched");


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
