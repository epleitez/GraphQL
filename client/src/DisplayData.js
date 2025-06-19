import React, { useState } from "react";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";

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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      username
      age
    }
  }
`;

function DisplayData() {
  //state for fetching data button
  const [movieSearched, setMovieSearched] = useState("");
  //state for creating a user
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");

  // Fetching all users and movies using Apollo Client's useQuery hook
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchedData, error: movieError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (movieError) return <p>Error fetching movie: {movieError.message}</p>;

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Username..."
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          type="text"
          placeholder="Nationality..."
          onChange={(event) => setNationality(event.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, username, age: Number(age), nationality },
              },
            });
          }}
        >
          Create User
        </button>
      </div>
      <h2>Users: </h2>
      {data &&
        data.users &&
        data.users.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>Age: {user.age}</p>
            <p>Username: {user.username}</p>
          </div>
        ))}

      <h2>Movies:</h2>
      {movieData &&
        movieData.movies &&
        movieData.movies.map((movie) => (
          <div key={movie.id}>
            <p>{movie.name}</p>
          </div>
        ))}

      <div>
        <input
          type="text"
          placeholder="movie name...(case sensitive)"
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
              <p>Movie Name: {movieSearchedData.movie.name}</p>
              <p>
                Year of Publication: {movieSearchedData.movie.yearOfPublication}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayData;
