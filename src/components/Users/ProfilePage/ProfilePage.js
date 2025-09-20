import { useEffect, useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import { multiPartFormData, useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { GET_PROFILE_API } from "../../../utils/ApisConstants";
import { useSelector } from "react-redux";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const userId = useSelector((state) => state.userId);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const auth = useAuth();
  useEffect(() => {
    if (auth) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(GET_PROFILE_API(userId), multiPartFormData(auth));
          setUserData(response.data);
        } catch (err) {
          alert(err.response?.data?.message || "Failed to fetch User Data");
        }
      };
      fetchPosts();
    }
  }, [auth, userId]);

  return (
    <>
      {userData && Object.keys(userData).length > 0 ? (
        <>
          <Button name={"back"} onClickHandle={() => navigate("/dashboard")} />
          <UserProfile user={userData} />
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </>
  );
};

export default ProfilePage;
