import React, { useState } from "react";
import { useQuery, useLazyQuery, gql } from "@apollo/client";

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

function DisplayData() {
  //state for fetching data button
  const [movieSearched, setMovieSearched] = useState("");

  // Fetching all users and movies using Apollo Client's useQuery hook
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (movieError) return <p>Error fetching movie: {movieError.message}</p>;

  return (
    <div>
      {data &&
        data.users &&
        data.users.map((user) => (
          <div key={user.id}>
            <h1>Name: {user.name}</h1>
            <p>Age: {user.age}</p>
            <p>Username: {user.username}</p>
          </div>
        ))}

      <h2>Movies:</h2>
      {movieData &&
        movieData.movies &&
        movieData.movies.map((movie) => (
          <div key={movie.id}>
            <h3>Movie Name: {movie.name}</h3>
          </div>
        ))}

      <div>
        <input
          type="text"
          placeholder="movie name..."
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({ variables: { name: movieSearched } });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              {" "}
              <h3>Movie Name: {movieSearchedData.movie.name}</h3>
              <h3>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
