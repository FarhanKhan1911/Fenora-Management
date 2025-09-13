import { useState, useEffect } from "react";
import { getRandomId } from "../../../../utils/CommonHelper";

const CreatePost = ({ addItem, editItem, itemToEdit }) => {
  const [mediaFile, setMediaFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setPreviewURL(itemToEdit.mediaURL);
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price);
    }
  }, [itemToEdit]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((mediaFile || previewURL) && title && description && price) {
      const item = {
        id: itemToEdit ? itemToEdit.id : getRandomId(),
        mediaFile,
        mediaURL: previewURL,
        title,
        description,
        price,
      };

      if (itemToEdit) {
        editItem(item);
      } else {
        addItem(item);
      }

      setMediaFile(null);
      setPreviewURL("");
      setTitle("");
      setDescription("");
      setPrice("");
    }
  };

  return (
    <div className='create-view'>
      <h2>{itemToEdit ? "Edit Item" : "Create New Item"}</h2>
      <form onSubmit={handleSubmit}>
        <input type='file' accept='image/*,video/*' onChange={handleFileChange} />

        {previewURL && (
          <>
            {mediaFile?.type.startsWith("video") || previewURL.endsWith(".mp4") ? (
              <video width='100%' controls src={previewURL} />
            ) : (
              <img src={previewURL} alt='Preview' style={{ maxWidth: "100%" }} />
            )}
          </>
        )}

        <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
        <button type='submit'>{itemToEdit ? "Update Item" : "Create Item"}</button>
      </form>
    </div>
  );
};

export default CreatePost;
