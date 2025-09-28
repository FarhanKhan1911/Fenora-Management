import { useState, useEffect } from "react";
import Button from "../../../Button/Button";
import axios from "axios";
import "./CreatePost.scss";
import { CREATE_POST_API, EDIT_POST_API } from "../../../../utils/ApisConstants";
import { multiPartFormData, useAuth } from "../../../../hooks/useAuth";
import { getMediaType } from "../../../../utils/CommonHelper";
import { mediaType } from "../../../../redux/redux.type";

const CreatePost = ({ addItem, editItem, itemToEdit, popupRef }) => {
  const [mediaFile, setMediaFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if (itemToEdit) {
      setPreviewURL(itemToEdit.mediaURL);
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price);
      setQuantity(itemToEdit.quantity);
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
    setQuantity("");
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
      if (quantity) {
        formData.append("quantity", quantity);
      }

      if (mediaFile) {
        formData.append("mediaFile", mediaFile);
      } else if (previewURL) {
        formData.append("mediaURL", previewURL);
      }

      try {
        let response;
        if (itemToEdit) {
          response = await axios.put(EDIT_POST_API(itemToEdit.id), formData, multiPartFormData(auth));
          editItem(response.data);
        } else {
          response = await axios.post(CREATE_POST_API, formData, multiPartFormData(auth));
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

          {mediaFile ? (
            <>
              {getMediaType(mediaFile) === mediaType.video ? (
                <video width='100%' controls src={previewURL} />
              ) : (
                <img src={previewURL} alt='Preview' />
              )}
            </>
          ) : itemToEdit ? (
            <>
              {getMediaType(itemToEdit.mediaPath) === mediaType.video ? (
                <video width='100%' controls src={itemToEdit.mediaPath} />
              ) : (
                <img src={itemToEdit.mediaPath} alt='Preview' />
              )}
            </>
          ) : null}

          <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
          <input type='number' placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))} />
          <button type='submit'>{itemToEdit ? "Update Item" : "Create Item"}</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
