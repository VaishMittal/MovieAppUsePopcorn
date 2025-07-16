import { useEffect,useState } from "react";

const key="6cd14023";

export function useMovies(query){
    const [movies, setMovies] = useState([]);
    const [isLoader,setIsLoader] = useState(true);
    const [error,setError] = useState("");
  
    useEffect(
        function(){
        const controller = new AbortController();
        async function fetchMovies(){
          try{
            setIsLoader(true)
            setError("")
            const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${query}`,{signal:controller.signal});
    
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
    
        // handleCloseMovie();
        fetchMovies();
        return function(){
          controller.abort();
        }  
      },[query])
      return {error,isLoader,movies};
}