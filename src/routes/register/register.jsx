import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiResquest"

function Register() {
  const [isErr, setIsErr] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate()
 const handleSubmit = async(e) => {
  try {
    setIsErr("");
    setIsLoading(true)
    e.preventDefault();
const formData = new FormData(e.target);

const username = formData.get("username");
const email = formData.get("email");
const password = formData.get("password");

console.log(username, email, password);

const res = await apiRequest.post("/auth/register",{
  username,
  email,
  password
}) 
  navigate('/');

} catch (error) {
    console.log(error)
    setIsErr(true);
  } finally{
    setIsLoading(false);
  }
  

  
}

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {isErr && <h2 style={{color: "red", width: '290px'}}>
           Something went Wrong while creating user!!! 
             </h2>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
