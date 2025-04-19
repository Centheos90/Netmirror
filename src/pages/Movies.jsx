import React from "react";
import { useGlobalContext } from "./Context";
import { NavLink } from "react-router";

function Movies() {
  const { movie,isLoading } = useGlobalContext();

  if(isLoading){
    return <div className="loading">loading...</div>
    
  }

  return (
    <section className="p-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {
        
          movie.map((curMovie) => {
            const { imdbID, Title, Poster } = curMovie;
            const movieName = Title.substring(0, 15);
            
            return (
              <NavLink to={`movie/${imdbID}`} key={imdbID}>
                <div className="bg-white rounded-xl shadow-md p-4 transition hover:scale-105 hover:shadow-lg">
                  <div >
                    <h2 className="tet-lg font-semibold mb-2">
                      {movieName.length >= 15 ? `${movieName}...` : movieName}
                    </h2>
                    <img src={Poster} alt={imdbID} className="w-full h-72 object-cover rounded"/>
                  </div>
                </div>
              </NavLink>
            );
          })
        
      }
      </div>
    </section>
  );
}
export default Movies;
