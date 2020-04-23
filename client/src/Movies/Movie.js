import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovieForm from './UpdateMovieForm';
import MovieList from "./MovieList";

function Movie({ addToSavedList, editSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

const deleteMovie = e => {
  e.preventDefault();
  axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
  .then(res =>{
    push('/')
    setMovie(res.data)
    
  }).catch(err => console.log(err))
}

  useEffect(() => {
    fetchMovie(params.id);
  }, [MovieList]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      
      <Link to={`/update-movie/${movie.id}`}>
      <div>
        Edit
      </div>
      </Link>

      <button onClick={deleteMovie}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
