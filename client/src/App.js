import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import DisplayData from "./DisplayData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000//", // Replace with your GraphQL server URL
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
