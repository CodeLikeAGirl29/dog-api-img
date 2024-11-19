import { Modal, Button } from "react-bootstrap";

const BreedModal = ({ showModal, handleCloseModal, breeds, loading }) => {
  return (
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
  );
};

export default BreedModal;
