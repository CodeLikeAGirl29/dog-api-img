import { Button } from "react-bootstrap";

const ButtonGroup = ({ fetchRandomDog, fetchBreed, handleShowModal }) => {
  return (
    <div className="my-3">
      <Button onClick={fetchRandomDog} variant="primary" className="me-2">
        Show Random Dog
      </Button>
      <Button onClick={fetchBreed} variant="success" className="me-2">
        Show Breed
      </Button>
      <Button onClick={handleShowModal} variant="info">
        Show All Breeds
      </Button>
    </div>
  );
};

export default ButtonGroup;
