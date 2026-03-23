import axios from "axios";
import Button from "../../../Button/Button";
import "./ListPosts.scss";
import { DELETE_POST_API, GET_ALL_POSTS_API } from "../../../../utils/ApisConstants";
import { useEffect, useState } from "react";
import { multiPartFormData, useAuth } from "../../../../hooks/useAuth";
import { getMediaType } from "../../../../utils/CommonHelper";
import { mediaType, userType } from "../../../../redux/redux.type";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import defaultProfilePic from "../../../../media/assets/images/default-profile.png";

const ListPosts = ({ createdPosts, onEdit }) => {
  const [items, setItems] = useState([]);
  const auth = useAuth();
  const navigate = useNavigate();
  const userRoleType = useSelector((state) => state.userType);
  const userId = useSelector((state) => state.userId);

  const handleOnPostDelete = async (itemId) => {
    try {
      await axios.delete(DELETE_POST_API(itemId), multiPartFormData(auth));
      setItems(items.filter((item) => item.id !== itemId));
      alert("Post Deleted Successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete post");
    }
  };

  const handleTitleClick = (item) => {
    navigate(`/profile/${item.userId}`);
  };

  useEffect(() => {
    if (auth) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(GET_ALL_POSTS_API, multiPartFormData(auth));
          setItems(response.data);
        } catch (err) {
          alert(err.response?.data?.message || "Failed to fetch posts");
        }
      };
      fetchPosts();
    }
  }, [auth, createdPosts]);

  return (
    <div className='list-view'>
      {items.map((item, index) => {
        const isCurrentUserAuthenticated = userId === item.userId;
        return (
          <div key={index} className='list-item'>
            <div className='post-header-wrapper'>
              <Button
                name={item.user.name}
                className='author-name'
                onClickHandle={() => handleTitleClick(item)}
                children={<img className='profile-pic' src={item.user.mediaPath ?? defaultProfilePic} alt='' />}
              />
              {isCurrentUserAuthenticated && (
                <Button className='delete-post-btn' iconClass={"fas fa-trash"} onClickHandle={() => handleOnPostDelete(item.id)} />
              )}
            </div>
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
            {item.quantity && (
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
            )}
            {isCurrentUserAuthenticated ? (
              <button onClick={() => onEdit(item, index)}>Edit</button>
            ) : userRoleType === userType.BuyerUser ? (
              <div className='buyer-buttons'>
                <Button name={"Buy Now"} onClickHandle={() => alert("Buy functionality not implemented yet")} />
                <Button name={"Make Offer"} onClickHandle={() => alert("Make Offer functionality not implemented yet")} />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default ListPosts;
