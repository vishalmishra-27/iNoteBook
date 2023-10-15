import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const host = "http://localhost:80";

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.cpassword === credentials.password){
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    })
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      localStorage.setItem('currentUser', json.useremail);
      navigate("/Notes");
    }

    else {
      navigate("/Login");
      alert("User with this email already exists");
    }
  }

  else{
    alert('Passwords do not match');
  }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="nameinput"><b>Name</b></label>
          <input id='nameinput' type="text" autoComplete='on' onChange={onChange} value={credentials.name} placeholder="Enter your name" name="name" required />

          <label htmlFor="usernameinput"><b>E-mail</b></label>
          <input id='usernameinput' type="email" autoComplete='on' onChange={onChange} value={credentials.email} placeholder="Enter your e-mail" name="email" required />

          <label htmlFor="passwordinput"><b>Password</b></label>
          <input id='passwordinput' type="password" onChange={onChange} value={credentials.password} placeholder="Enter Password" name="password" required />

          <label htmlFor="cpasswordinput"><b>Confirm Password</b></label>
          <input id='cpasswordinput' type="password" onChange={onChange} value={credentials.cpassword} placeholder="Confirm Password" name="cpassword" required />

          <button id='submitbutton' type="submit">Signup</button>
        </div>
      </form>
    </div>
  )
}

export default Signup