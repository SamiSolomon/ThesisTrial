import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import "./searchService.css";

const SearchService = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (query) => {
    if (query) {
      try {
        const response = await axios.get('/api/search', {
          params: { query },
        });
        setSuggestions(response.data.hospitals);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 300), []);

  useEffect(() => {
    debouncedFetchSuggestions(searchQuery);
  }, [searchQuery, debouncedFetchSuggestions]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // You can handle form submission here if needed
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search by location, by service or by hospital"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className="suggestions-container">
        {suggestions.length > 0 && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion.name} - {suggestion.location}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchService;

