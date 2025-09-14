import axios from "axios";
import Button from "../../../Button/Button";
import "./ListPosts.scss";
import { deletePostAPI, getAllPostsAPI } from "../../../../utils/ApisConstants";
import { useEffect, useState } from "react";
import { tokenConfig, useAuth } from "../../../../hooks/useAuth";
import { getMediaType } from "../../../../utils/CommonHelper";
import { mediaType } from "../../../../redux/redux.type";

const ListPosts = ({ createdPosts, onEdit }) => {
  const [items, setItems] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(getAllPostsAPI, tokenConfig(auth));
          setItems(response.data);
        } catch (err) {
          alert(err.response?.data?.message || "Failed to fetch posts");
        }
      };
      fetchPosts();
    }
  }, [auth, createdPosts]);

  const handleOnPostDelete = async (itemId) => {
    try {
      await axios.delete(deletePostAPI(itemId), tokenConfig(auth));
      setItems(items.filter((item) => item.id !== itemId));
      alert("Post Deleted Successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    }
  };

  return (
    <div className='list-view'>
      {items.map((item, index) => (
        <div key={item.id} className='list-item'>
          <Button className='delete-post-btn' iconClass={"fas fa-trash"} onClickHandle={() => handleOnPostDelete(item.id)} />
          {item.mediaURL?.data &&
            (getMediaType(item) === mediaType.image ? (
              <img src={item.mediaPath} alt={item.title} />
            ) : (
              <video controls src={item.mediaPath} />
            ))}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>
            <strong>Price:</strong> Rs.{item.price}
          </p>
          <button onClick={() => onEdit(item, index)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default ListPosts;
