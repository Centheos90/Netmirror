import React from 'react'
import { useState,useEffect } from 'react';
import { useParams,NavLink } from 'react-router'
import { useGlobalContext } from './Context';

function SingleMovie() {
  // const param=useParams();
  const {id}=useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");

  const API = `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${id}`;

  const fetchMovie = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      if (data.Response === "True") {
        setMovie(data);
        setIsLoading(false);
      } else {
        setError(data.Error || "Movie not found");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Something went wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md w-full text-center">
        {error}
      </div>
      <NavLink 
        to="/" 
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        Go Back
      </NavLink>
    </div>
  );

  const { Poster, Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, imdbRating, imdbVotes, BoxOffice, Production } = movie;
  
  return (
    <section className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Movie Poster */}
            <div className="md:w-1/3 p-6 flex justify-center">
              <img 
                src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
                alt={Title} 
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md"
              />
            </div>
            
            {/* Movie Details */}
            <div className="md:w-2/3 p-6 md:p-8">
              <div className="flex flex-col h-full">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{Title} <span className="text-gray-600">({Year})</span></h1>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {Rated}
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {Runtime}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {Genre}
                    </span>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-4">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="ml-1 text-gray-900 font-semibold">{imdbRating}/10</span>
                    </div>
                    <span className="text-gray-600">{Released} • {Country}</span>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Plot</h2>
                    <p className="text-gray-700">{Plot}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="font-semibold text-gray-900">Director</h3>
                      <p className="text-gray-700">{Director}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Writers</h3>
                      <p className="text-gray-700">{Writer}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Actors</h3>
                      <p className="text-gray-700">{Actors}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Language</h3>
                      <p className="text-gray-700">{Language}</p>
                    </div>
                  </div>

                  {Awards && Awards !== "N/A" && (
                    <div className="mb-6">
                      <h3 className="font-semibold text-gray-900">Awards</h3>
                      <p className="text-gray-700">{Awards}</p>
                    </div>
                  )}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <NavLink 
                    to="/" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                    </svg>
                    Back to Movies
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleMovie;