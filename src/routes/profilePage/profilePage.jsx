import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiResquest";
import { Suspense, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";

function ProfilePage() {
  
  const {updateUser, currentUser} = useContext(AuthContext);
  
  const navigate = useNavigate();
  
  const data =  useLoaderData();
  
  // useEffect(() => {
    //   if (!currentUser) {
      //     navigate("/login");
      //     }
      //     }, [currentUser, navigate]);
      
  
  const handleLogout = async() => {
  try {
   await apiRequest.post('/auth/logout');
    updateUser(null);
    navigate('/')
  } catch (error) {
    console.log(error)
  }
}




  return (
   <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to='/profile/update'>
            <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/newPost">
            <button>Create New Post</button>
            </Link>
          </div>

            <Suspense fallback={<p>Loading...</p>}>
          <Await
          resolve={data.postResponse}
          errorElement={<p>Error loading posts!</p>}>
          {(postResponse)=>
          <List posts={postResponse.data.userPosts}/>
          //  console.log(postResponse.data.userPosts)
         }
          </Await>
        </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<p>Loading...</p>}>
          <Await
          resolve={data.postResponse}
          errorElement={<p>Error loading posts!</p>}>
          {(postResponse)=>
          <List posts={postResponse.data.savedPosts}/>
           
            // console.log("post", postResponse.data.userPosts)
         }
          </Await>
        </Suspense>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
          resolve={data.chatResponse}
          errorElement={<p>Error loading posts!</p>}>
          {(chatResponse)=>
          <Chat chats={chatResponse.data}/>
          //  console.log(chatResponse)
         }
          </Await>
        </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
