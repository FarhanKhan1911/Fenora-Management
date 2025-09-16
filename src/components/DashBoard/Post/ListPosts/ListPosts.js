import axios from "axios";
import Button from "../../../Button/Button";
import "./ListPosts.scss";
import { deletePostAPI, getAllPostsAPI } from "../../../../utils/ApisConstants";
import { useEffect, useState } from "react";
import { multiPartFormData, useAuth } from "../../../../hooks/useAuth";
import { getMediaType } from "../../../../utils/CommonHelper";
import { mediaType, userType } from "../../../../redux/redux.type";
import { useSelector } from "react-redux";

const ListPosts = ({ createdPosts, onEdit }) => {
  const [items, setItems] = useState([]);
  const auth = useAuth();
  const userRoleType = useSelector((state) => state.userType);

  useEffect(() => {
    if (auth) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(getAllPostsAPI, multiPartFormData(auth));
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
      await axios.delete(deletePostAPI(itemId), multiPartFormData(auth));
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
          {userRoleType === userType.SellerUser && (
            <Button className='delete-post-btn' iconClass={"fas fa-trash"} onClickHandle={() => handleOnPostDelete(item.id)} />
          )}
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
          {userRoleType === userType.SellerUser ? (
            <button onClick={() => onEdit(item, index)}>Edit</button>
          ) : (
            <Button name={"Buy Now"} onClickHandle={() => alert("Buy functionality not implemented yet")} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ListPosts;
