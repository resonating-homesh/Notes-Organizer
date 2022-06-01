import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    let history = useNavigate();
    

    const handleClick = async (e) =>
    {
        e.preventDefault();
        const url = 'http://localhost:5000/api/auth/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if (json.success)
        {
            localStorage.setItem('token', json.authToken);
            history("/");
        }
        else{
            alert("Invalid Credentials");
        }
    }

    const onChange = (e) =>
    {
        e.preventDefault();
        setCredentials({...credentials, [e.target.id]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={credentials.email} onChange={onChange} type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange}  value={credentials.password} type="password" className="form-control" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login