const formCreateImages = ({
  setFilesToUpload,
  filesToUpload,
  setIsMyCouverture,
  isMyCouverture,
}) => {
  const addSingleFileToPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFilesToUpload((prevFiles) => [...prevFiles, file]);
    }
  };

  const removeImage = (index: number) => {
    setFilesToUpload((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="formForImages">
      <div className="filesToUpload">
        {/* remove and preview */}
        {filesToUpload.map((file, index) => (
          <div
            className={`${isMyCouverture == index ? "isCouv" : ""} imager`}
            key={index}
          >
            <img src={URL.createObjectURL(file)} alt={`Preview ${file.name}`} />
            <button onClick={() => setIsMyCouverture(index)}>
              {isMyCouverture == index
                ? "Image de couverture"
                : "Définir comme image de couverture"}
            </button>
            <span className="remove_img" onClick={() => removeImage(index)}>
              Supprimer cette image
            </span>
          </div>
        ))}
      </div>

      {/* input */}
      <div className="inputer">
        <label className="button" htmlFor="oneMoreFile">
          Ajouter une image
        </label>
        <input
          id="oneMoreFile"
          type="file"
          accept="image/*"
          onChange={(e) => {
            addSingleFileToPreview(e);
          }}
        />
      </div>
    </div>
  );
};

export default formCreateImages;
