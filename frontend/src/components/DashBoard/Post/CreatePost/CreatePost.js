import { useState, useEffect } from "react";
import Button from "../../../Button/Button";
import axios from "axios";
import "./CreatePost.scss";
import { createPostAPI, editPostAPI } from "../../../../utils/ApisConstants";
import { tokenConfig, useAuth } from "../../../../hooks/useAuth";
import { getMediaType } from "../../../../utils/CommonHelper";
import { mediaType } from "../../../../redux/redux.type";

const CreatePost = ({ addItem, editItem, itemToEdit, popupRef }) => {
  const [mediaFile, setMediaFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const auth = useAuth();

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

  const resetForm = () => {
    setMediaFile(null);
    setPreviewURL("");
    setTitle("");
    setDescription("");
    setPrice("");
  };

  const handleOnClose = (e) => {
    e.preventDefault();
    resetForm();
    editItem([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((mediaFile || previewURL) && title && description && price) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);

      if (mediaFile) {
        formData.append("mediaFile", mediaFile);
      } else if (previewURL) {
        formData.append("mediaURL", previewURL);
      }

      try {
        let response;
        if (itemToEdit) {
          response = await axios.put(editPostAPI(itemToEdit.id), formData, tokenConfig(auth));
          editItem(response.data);
        } else {
          response = await axios.post(createPostAPI, formData, tokenConfig(auth));
          addItem(response.data);
        }
        resetForm();
      } catch (error) {
        console.error("Error submitting post:", error);
      }
    }
  };

  return (
    <div className='create-post-wrapper'>
      <div className='create-view' role='dialog' aria-modal='true' ref={popupRef}>
        <Button className='close-btn' iconClass={"far fa-times-circle"} onClickHandle={handleOnClose} />
        <h2>{itemToEdit ? "Edit Item" : "Create New Item"}</h2>
        <form onSubmit={handleSubmit}>
          <input type='file' accept='image/*,video/*' onChange={handleFileChange} />

          {previewURL && (
            <>
              {getMediaType(previewURL) === mediaType.video ? (
                <video width='100%' controls src={previewURL} />
              ) : (
                <img src={previewURL} alt='Preview' />
              )}
            </>
          )}

          <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
          <button type='submit'>{itemToEdit ? "Update Item" : "Create Item"}</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
