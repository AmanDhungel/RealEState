import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from '../../lib/apiResquest'
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState(false);
  const {currentUser, updateUser}  = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const navigate  = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const {username, email, password} = Object.fromEntries(formData);

  try {
    const res = await apiRequest.put(
      `/user/${currentUser.id}`,
      {
        username,
        email,
        password,
        avatar: avatar[0]
        }
    )

    
    updateUser(res.data);
    navigate('/profile');
    
  } catch (error) {
    console.log(error)
    setError(true);
  }
    }


  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
     

          {error && <h2 style={{color: 'red'}}>Something went wrong</h2>}
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src={ avatar[0] || currentUser.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'} alt="" className="avatar" />
      <UploadWidget uwConfig={{
        cloudName: "dcj9uisx6",
        uploadPreset: "estate",
        multiple: false,
        maxImageFileSize: 20000000,
        folder: "avatars",
      }}
      setState = {setAvatar}
      />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
