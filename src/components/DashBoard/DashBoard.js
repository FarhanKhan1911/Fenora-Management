import { Fragment, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Auth/Logout/Logout";
import { useSelector } from "react-redux";
import CreatePost from "./Post/CreatePost/CreatePost";
import ListPosts from "./Post/ListPosts/ListPosts";
import Button from "../Button/Button";
import { userType } from "../../redux/redux.type";

function Dashboard() {
  const userRoleType = useSelector((state) => state.userType);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const addItem = (newItem) => {
    if (newItem) {
      setItems([...items, newItem]);
      setIsPopupOpen(false);
    }
  };

  const editItem = (updatedItem) => {
    if (updatedItem) {
      const updatedItems = items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      setItems(updatedItems);
    }
    setItemToEdit(null);
    setIsPopupOpen(false);
  };

  const handleEdit = (item, index) => {
    setItemToEdit({ ...item, index });
    setIsPopupOpen(true);
  };

  const handleCreateOrEditPost = () => {
    setIsPopupOpen(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (isPopupOpen) {
      document.body.classList.add("no-scroll");
      popupRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isPopupOpen]);

  return (
    <Fragment>
      <h1>Welcome to Dashboard {userRoleType}</h1>
      <LogoutButton />
      {userRoleType === userType.SellerUser && <Button name={"CreatePost"} onClickHandle={handleCreateOrEditPost} />}
      {isPopupOpen && <CreatePost addItem={addItem} editItem={editItem} itemToEdit={itemToEdit} popupRef={popupRef} />}
      <ListPosts createdPosts={items} onEdit={handleEdit} />
    </Fragment>
  );
}

export default Dashboard;
