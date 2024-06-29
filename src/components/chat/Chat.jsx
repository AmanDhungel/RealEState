import { useContext, useState } from "react";
import "./chat.scss";
  import {AuthContext} from '../../context/AuthContext'
import apiRequest from "../../lib/apiResquest";
import {format} from "timeago.js"
import { SocketContext } from "../../context/SocketContext";

function Chat({chats}) {
  const [chat, setChat] = useState("");

  const {currentUser} = useContext(AuthContext);

  // const {socket} = useContext(SocketContext);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chats/" + id);
      // console.log(res);
      setChat({...res.data, receiver});

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async(e) => {
   e.preventDefault();
   const formData = new FormData(e.target);
   const text = formData.get("text")
   if(!text) return;
   try {
    const res = await apiRequest.post("/message/" + chat.id, {text});
    setChat(prev=>({...prev, message:[...prev.message, res.data]}));

    e.target.reset();

    
   } catch (error) {
    console.log(error);
   }
  }
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
          {chats?.map(c=>(
            <div className="message" key={c.id}
            style={{backgroundColor: c.seenBy.includes(currentUser.id)? "white": ""}}
            onClick={()=>handleOpenChat(c.id, c.receiver)}
            >
              <img
                src={c.receiver.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'}
                alt=""
                />
                <h1>{c.username}</h1>
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
            </div>

            // <h1>{c.receiver.username}</h1>
          ))}
       </div>
       {console.log(chat)}
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || 'https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg'}
                alt=""
              />
             {chat.receiver.username}
            </div>
            <span className="close" onClick={()=>setChat(null)}>X</span>
          </div>
          <div className="center">
            {chat.message.map((message)=> (
                  <div className="chatMessage" key={message.id}
                  style={{
                    alignSelf: message.userID === currentUser.id ? "flex-end" : "flex-start",
                    textAlign: message.userID === currentUser.id ? "right" : "left"}}>
              <p>{message.text}</p>
              <span>{format(message.createdAt)}</span>
              </div>
            ))}
            {/* <div className="chatMessage">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div> */}
          
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
