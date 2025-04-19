import React, { useContext, useEffect, useState, } from "react";
import { createContext } from "react";

const API_URL = `https://www.omdbapi.com/?i=tt3896198&apikey=${import.meta.env.VITE_API_KEY}`;

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "Error is occurring" });
  const[defQuery,setDefQuery]=useState("titanic")
  const[query,setQuery]=useState("")

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(`This is coming from Context`, data);

      if (data.Response === "True") {
        setIsLoading(false);
        setIsError({
          show: false,
          msg: "",
        });
        setMovie(data.Search);
      } else {
        setIsLoading(false);
        setIsError({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    let timerOut=setTimeout(()=>{
        if(!query){
            getMovies(`${API_URL}&s=${defQuery}`);
        }else{
        getMovies(`${API_URL}&s=${query}`);
        }   
    },500)
    return ()=>{clearTimeout(timerOut)}
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie,query,setQuery}}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };