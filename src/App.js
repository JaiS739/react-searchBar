import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import countries from "./utilis/utils";

function App() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query === "") {
      setSuggestions([]);
    } else {
      const newListOfSuggestions = countries
        .filter((e) =>
          e.country.toLocaleLowerCase().indexOf(query) !== -1 ? true : false
        )
        .map((item) => item.country);
      setSuggestions(newListOfSuggestions);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [query]);

  return (
    <div className="App">
      <h1>Search Bar</h1>
      <div>query is : {query}</div>
      <SearchBar
        loading={loading}
        setLoading={setLoading}
        suggestions={suggestions}
        onChange={(val) => setQuery(val)}
      />
    </div>
  );
}

export default App;
