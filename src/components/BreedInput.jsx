import { useEffect } from "react";
import PropTypes from "prop-types";

const BreedInput = ({
  breedInput,
  setBreedInput,
  breeds,
  setFilteredBreeds,
  filteredBreeds,
  setContent,
}) => {
  useEffect(() => {
    if (breedInput) {
      const suggestions = breeds.filter((breed) =>
        breed.toLowerCase().startsWith(breedInput.toLowerCase())
      );
      setFilteredBreeds(suggestions);
    } else {
      setFilteredBreeds([]);
    }
  }, [breedInput, breeds, setFilteredBreeds]);

  const handleSuggestionClick = (suggestion) => {
    setBreedInput(suggestion);
    setFilteredBreeds([]);
    setContent(null); // Clear previous content
  };

  return (
    <div className="form-group position-relative">
      <label htmlFor="input-breed">Choose a breed:</label>
      <input
        type="text"
        id="input-breed"
        className="form-control"
        placeholder="Enter a breed"
        value={breedInput}
        onChange={(e) => setBreedInput(e.target.value)}
      />
      {filteredBreeds.length > 0 && (
        <ul className="suggestions-list">
          {filteredBreeds.map((breed) => (
            <li
              key={breed}
              onClick={() => handleSuggestionClick(breed)}
              className="suggestion-item"
            >
              {breed}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

BreedInput.propTypes = {
  breedInput: PropTypes.string.isRequired,
  setBreedInput: PropTypes.func.isRequired,
  breeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFilteredBreeds: PropTypes.func.isRequired,
  filteredBreeds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setContent: PropTypes.func.isRequired,
};

export default BreedInput;
