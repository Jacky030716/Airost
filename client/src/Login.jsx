import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Login(){
    const [utmId, setUtmId] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    function handleLogin(event){
        event.preventDefault();
        axios.post('http://localhost:8081/login', {utmId, password})
        .then(res => {
            console.log(res);
            // Assuming the response contains a success status or relevant data
            if (res.data == "Success") {
              localStorage.setItem('utmId', utmId);
              // Navigate to homepage if login is successful
              navigate('/userprofile');
            }
          })
          .catch(err => console.log(err));
    };

    return(
        <div>
            <h2>Login</h2>
      <div>
        <label htmlFor="utmId">UTM ID:</label>
        <input
          type="text"
          id="utmId"
          value={utmId}
          onChange={ e => setUtmId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={ e => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login