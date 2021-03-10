import { Fragment, useState } from "react";
import Directories from "../components/Homepage/Directories";
import Loading from "../components/Homepage/Loading";
import SearchBar from "../components/Homepage/SearchBar";
import SearchResult from "../components/Homepage/SearchResult";
import { getDirectories, search } from "../services/search";

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  const [directories, setDirectories] = useState([]);
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const countryChanged = (country) => {
    const directoriesDetails = getDirectories(country);
    setDirectories(directoriesDetails);
  };

  const searchSubmitted = async (filter) => {
    setIsLoading(true);
    const searchResult = await search(filter, directories);

    if (!searchResult) {
      setIsLoading(false);
      alert("Unexpected Error. Please try again.");
      return;
    }

    setResults(searchResult);
    setSearched(true);
    setIsLoading(false);
  };

  const reset = () => {
    setResults([]);
    setDirectories([]);
    setSearched(false);
    setIsLoading(false);
  };
  return (
    <div className="Homepage">
      <h1>Is your company listed accurately in these online directories?</h1>

      {!searched && (
        <Fragment>
          <SearchBar onCountryChange={countryChanged} onSearchSubmitted={searchSubmitted} />
          <Directories directories={directories} />
        </Fragment>
      )}

      {searched && results.length > 0 && (
        <Fragment>
          <a className="reset" href="#" onClick={reset}>
            Start Over
          </a>
          <SearchResult directories={results} />
        </Fragment>
      )}

      <Loading show={isLoading} directories={directories} />
    </div>
  );
};
