import { useEffect, useState } from "react";
import "./UserProfile.scss";
import axios from "axios";
import { UPDATE_PROFILE_API } from "../../../utils/ApisConstants";
import { useSelector } from "react-redux";
import { multiPartFormData, useAuth } from "../../../hooks/useAuth";
import Button from "../../Button/Button";
import defaultProfilePic from "../../../media/assets/images/default-profile.png";
import BackButton from "../../Button/BackButton";

const UserProfile = ({ user }) => {
  const userId = useSelector((state) => state.userId);
  const auth = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user.phone || "",
    address: user.address || "",
    city: user.city || "",
    state: user.state || "",
    country: user.country || "",
    pinCode: user.pinCode || "",
    profilePicture: user.mediaURL || "",
    mediaPath: user.mediaPath || "",
  });

  const [originalData, setOriginalData] = useState(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const { mediaPath, ...formDataToSend } = formData;
      let response = await axios.put(UPDATE_PROFILE_API(userId), formDataToSend, multiPartFormData(auth));
      setFormData((prev) => ({
        ...prev,
        profilePicture: response.data.mediaURL || prev.profilePicture,
        mediaPath: response.data.mediaPath || prev.mediaPath,
      }));
      setOriginalData(response.data);
      setIsEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to put User Data");
    }
  };

  const { name, email, role } = user;

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setFormData({
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        pinCode: user.pinCode || "",
        profilePicture: user.mediaURL || "",
        mediaPath: user.mediaPath || "",
      });
      setOriginalData({
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        country: user.country || "",
        pinCode: user.pinCode || "",
        profilePicture: user.mediaURL || "",
        mediaPath: user.mediaPath || "",
      });
    }
  }, [user]);

  return (
    <div className={"user-profile-container"}>
      <BackButton />
      <h2 className={"title"}>User Profile</h2>
      <div className={"profile-item"}>
        <div className='profile-picture-container'>
          <img src={formData.mediaPath !== "" ? formData.mediaPath : defaultProfilePic} alt='Profile' className='profile-picture' />
          {isEditing && (
            <input
              type='file'
              accept='image/*'
              onChange={(e) => setFormData({ ...formData, profilePicture: e.target.files[0] })}
              className={"input"}
            />
          )}
          <div className='profile-name'>{name}</div>
          <div className='profile-role'>{role}</div>
        </div>
      </div>

      <hr />

      <div className='profile-info'>
        <div className={"profile-item"}>
          <strong>Name:</strong> {name}
        </div>
        <div className={"profile-item"}>
          <strong>Email:</strong> {email}
        </div>

        {renderField("Phone", "phone", formData.phone, isEditing, handleChange)}
        {renderField("Address", "address", formData.address, isEditing, handleChange)}
        {renderField("City", "city", formData.city, isEditing, handleChange)}
        {renderField("State", "state", formData.state, isEditing, handleChange)}
        {renderField("Country", "country", formData.country, isEditing, handleChange)}
        {renderField("Pin Code", "pinCode", formData.pinCode, isEditing, handleChange)}
      </div>

      {userId === user.id && (
        <div className='action-button-wrapper' style={{ marginTop: "1rem" }}>
          {!isEditing ? (
            <Button name={"Edit"} onClickHandle={handleEdit} />
          ) : (
            <>
              <Button name={"Save"} onClickHandle={handleSave} styleItem={{ marginRight: "10px" }} />
              <Button name={"Cancel"} onClickHandle={handleCancel} className={"cancel-button"} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const renderField = (label, name, value, isEditing, handleChange) => (
  <div className={"profile-item"}>
    <strong>{label}:</strong>
    {isEditing ? <input type='text' name={name} value={value} onChange={handleChange} className={"input"} /> : <span>{value || "-"}</span>}
  </div>
);

export default UserProfile;
