const DogImage = ({ content }) => {
  if (!content) return <p>Enter a breed or generate a random image of a dog!</p>;

  return (
    <div>
      <h3>{content.name.charAt(0).toUpperCase() + content.name.slice(1)}</h3>
      <img
        src={content.image}
        alt={`${content.name} dog`}
        className="img-fluid rounded shadow mt-3"
        style={{ width: "300px", height: "300px", objectFit: "cover" }}
      />
    </div>
  );
};

export default DogImage;
