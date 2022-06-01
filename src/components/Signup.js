import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const { showAlert } = props;

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });

  let history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const url = 'http://localhost:5000/api/auth/createUser';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    })
    const json = await response.json();
    console.log(json);
    if (json.success)
    {
      console.log(json);
      localStorage.setItem('token', json.authToken);
      history("/");
      showAlert("Account created successfully", "success")
    }
    else
    {
      showAlert("Invalid Credentials", "danger")
    }

  
  }

  const onChange = (e) => {
    e.preventDefault();
    setCredentials({ ...credentials, [e.target.id]: e.target.value })
  }


  return (
    <div className='container'>
    <h2>Keep all your notes organised at one place!</h2>
      <form className='my-4' onSubmit={handleClick}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input type="text" onChange={onChange} className="form-control" value={credentials.name} id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">Email address</label>
          <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" value={credentials.password} onChange={onChange} required minLength={6} className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup