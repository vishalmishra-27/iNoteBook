import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const host = "https://i-note-book-gold.vercel.app";

    const [credentials, setCredentials] = useState({email: "", password: ""})

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json();

        if(json.success){
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('currentUser', json.useremail);
            navigate("/Notes");
        }

        else {
            alert("User doesn't exist")
        }
    }

    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <label htmlFor="usernameinput"><b>E-mail</b></label>
                    <input id='usernameinput' type="email" autoComplete='on' onChange={onChange} value={credentials.email} placeholder="Enter e-mail" name="email" required />

                    <label htmlFor="passwordinput"><b>Password</b></label>
                    <input id='passwordinput' type="password" onChange={onChange} value={credentials.password} placeholder="Enter Password" name="password" required />

                    <button id='submitbutton' type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login