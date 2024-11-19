import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import "./App.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [breedInput, setBreedInput] = useState("");
  const [breeds, setBreeds] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRandomDog = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");
      const data = await response.json();
      if (data.status === "success") {
        setContent(<img src={data.message} alt="Random Dog" className="img-fluid rounded shadow mt-3" />);
      } else {
        setContent(<p>Failed to fetch random dog image.</p>);
      }
    } catch (error) {
      console.error("Error fetching random dog:", error);
      setContent(<p>Error fetching random dog.</p>);
    }
  };

  const fetchBreed = async () => {
    if (!breedInput.trim()) {
      setContent(<p>Please enter a breed name.</p>);
      return;
    }

    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breedInput.toLowerCase()}/images/random`);
      const data = await response.json();
      if (data.status === "success") {
        setContent(
          <img src={data.message} alt={`${breedInput} dog`} className="img-fluid rounded shadow mt-3" />
        );
      } else {
        setContent(<p>Breed not found!</p>);
      }
    } catch (error) {
      console.error("Error fetching breed:", error);
      setContent(<p>Error fetching breed.</p>);
    }
  };

  const fetchSubBreeds = async () => {
    if (!breedInput.trim()) {
      setContent(<p>Please enter a breed name.</p>);
      return;
    }

    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breedInput.toLowerCase()}/list`);
      const data = await response.json();
      if (data.status === "success") {
        if (data.message.length === 0) {
          setContent(<p>No sub-breeds found!</p>);
        } else {
          setContent(
            <ol>
              {data.message.map((subBreed) => (
                <li key={subBreed}>{subBreed}</li>
              ))}
            </ol>
          );
        }
      } else {
        setContent(<p>Breed not found!</p>);
      }
    } catch (error) {
      console.error("Error fetching sub-breeds:", error);
      setContent(<p>Error fetching sub-breeds.</p>);
    }
  };

  const handleShowModal = async () => {
    setShowModal(true);
    setLoading(true);

    try {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const data = await response.json();

      if (data.status === "success") {
        setBreeds(Object.keys(data.message));
      } else {
        console.error("Error fetching breeds.");
      }
    } catch (error) {
      console.error("Error fetching breeds:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <Card>
      <div className="container text-center">
        <Card.Title>Dog Glossary</Card.Title>
        <Card.Body>
          <Button onClick={fetchRandomDog} className="btn btn-primary mb-4" id="button-random-dog">
            Show Random Dog
          </Button>
          <div className="form-group">
            <label htmlFor="input-breed">Choose a breed:</label>
            <input
              type="text"
              id="input-breed"
              className="form-control"
              placeholder="Enter a breed"
              value={breedInput}
              onChange={(e) => setBreedInput(e.target.value)}
            />
            <ButtonGroup>
              <Button onClick={fetchBreed} className="btn btn-primary mt-3" id="button-show-breed">
                Show Breed
              </Button>
              <Button onClick={fetchSubBreeds} className="btn btn-secondary mt-3" id="button-show-sub-breed">
                Show Sub-Breed
              </Button>
              <Button onClick={handleShowModal} className="btn btn-info mt-3" id="button-show-all">
                Show All Breeds
              </Button>
            </ButtonGroup>
            <Modal show={showModal} onHide={handleCloseModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Dog Breeds</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {loading ? (
                  <p>Loading breeds...</p>
                ) : (
                  <ol>
                    {breeds.map((breed) => (
                      <li key={breed}>{breed}</li>
                    ))}
                  </ol>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div id="content">{content}</div>

        </Card.Body>
      </div>
    </Card>
  );
};

export default App;
