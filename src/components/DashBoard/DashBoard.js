import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../Auth/Logout/Logout";
import { useSelector } from "react-redux";
import CreatePost from "./Post/CreatePost/CreatePost";
import ListPosts from "./Post/ListPosts/ListPosts";

function Dashboard() {
  const userType = useSelector((state) => state.userType);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  const addItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const editItem = (updatedItem) => {
    const updatedItems = items.map((item) => (item.id === updatedItem.id ? updatedItem : item));
    setItems(updatedItems);
    setItemToEdit(null);
  };

  const handleEdit = (item, index) => {
    setItemToEdit({ ...item, index });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Fragment>
      <h1>Welcome to Dashboard {userType}</h1>
      <LogoutButton />

      <CreatePost addItem={addItem} editItem={editItem} itemToEdit={itemToEdit} />
      <ListPosts items={items} onEdit={handleEdit} />
    </Fragment>
  );
}

export default Dashboard;
