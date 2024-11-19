import { useState, useEffect } from "react";
import Header from "./components/Header";
import ButtonGroup from "./components/ButtonGroup";
import BreedInput from "./components/BreedInput";
import DogImage from "./components/DogImage";
import BreedModal from "./components/BreedModal";
import "./App.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [breedInput, setBreedInput] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all breeds on component mount
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await response.json();
        if (data.status === "success") {
          setBreeds(Object.keys(data.message));
        } else {
          console.error("Failed to fetch breeds.");
        }
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);

  const fetchRandomDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      if (data.status === "success") {
        const urlParts = data.message.split("/");
        const breedName = urlParts[4].replace("-", " ");
        setContent({ image: data.message, name: breedName });
      } else {
        setContent(null);
      }
    } catch (error) {
      console.error("Error fetching random dog:", error);
    }
  };

  const fetchBreed = async () => {
    if (!breedInput.trim()) return;

    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breedInput.toLowerCase()}/images/random`);
      const data = await response.json();
      if (data.status === "success") {
        setContent({ image: data.message, name: breedInput });
      } else {
        setContent(null);
      }
    } catch (error) {
      console.error("Error fetching breed:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container text-center">
      <Header />
      <ButtonGroup
        fetchRandomDog={fetchRandomDog}
        fetchBreed={fetchBreed}
        fetchSubBreeds={() => { }}
        handleShowModal={handleShowModal}
      />
      <BreedInput
        breedInput={breedInput}
        setBreedInput={setBreedInput}
        breeds={breeds}
        setFilteredBreeds={setFilteredBreeds}
        filteredBreeds={filteredBreeds}
        setContent={setContent}
      />
      <DogImage content={content} />
      <BreedModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        breeds={breeds}
        loading={loading}
      />
    </div>
  );
};

export default App;
