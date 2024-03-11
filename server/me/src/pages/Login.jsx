import React , { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login() {
  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  })

  let navigate = useNavigate();


const handleSubmit = async (e) => {

e.preventDefault(); // Synthetic event(Interview)
console.log(JSON.stringify({
    email: credentials.email,
    password: credentials.password
    
  }))

const response = await fetch("https://expense-tracker-h2n5.onrender.com//loginuser", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({

    email: credentials.email,
    password: credentials.password
  })
});

const jsn = await response.json();
console.log(jsn);

if (!jsn.success) {
  alert("Sorry! this email is not registered");
}

if(jsn.success){
  localStorage.setItem("email", credentials.email);
  localStorage.setItem("authToken", jsn.authToken);
  console.log(localStorage.getItem("authToken"));
  window.userEmail = localStorage.getItem("email");

  navigate("/");
}

}

const onChange = (event) => {
setcredentials({ ...credentials, [event.target.name]: event.target.value });
};

  return (
    <>
     <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          

          <button type="submit" className="m-3 btn btn-success">
            Login
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            {" "}
            I am new User
          </Link>

     

         
        </form>
      </div>

    </>

  )
}
