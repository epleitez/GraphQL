//import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

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

function DisplayData() {

  // Fetching all users and movies using Apollo Client's useQuery hook
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData} = useQuery(QUERY_ALL_MOVIES);

  //state for fetching data button
  //const [movieSearched, setMovieSearched] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data && data.users && data.users.map((user) => (
        <div key={user.id}>
          <h1>Name: {user.name}</h1>
          <p>Age: {user.age}</p>
          <p>Username: {user.username}</p>
        </div>
      ))}

      <h2>Movies:</h2>
      {movieData && movieData.movies && movieData.movies.map((movie) => (
        <div key={movie.id}>
          <h3>Movie Name: {movie.name}</h3>
        </div>
      ))}

      {/* <div>
        <input type="text" placeholder="Interstellar..." onChange={(event) => {setMovieSearched(event.target)}}/>
        <button>Fetch Data</button>
        <div>

        </div>
      </div> */}
    </div>
  )
}

export default DisplayData;
