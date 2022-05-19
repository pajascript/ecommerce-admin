import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { login } from "../redux/apiCalls";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const user = useSelector(state =>state.user.currentUser);
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };

    useEffect(() => {
        if (user) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [user]);

  return loggedIn ? (
      <Redirect to="/home" />
  ) : (
    <div 
    style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }} 
>
    <input
        style={{
            padding: 10,
            marginBottom: 20
        }} 
        type="text" 
        placeholder='Username'  
        onChange={e => setUsername(e.target.value)}    
    />
    <input 
        style={{
            padding: 10,
            marginBottom: 20
        }} 
        type="password" 
        placeholder='Password' 
        onChange={e => setPassword(e.target.value)}
    />
    <button 
        style={{
            padding: 10,
            width: 100,
            cursor: "pointer"
        }}
        onClick={handleClick} 
    >Login</button>
</div>
  )
}

export default Login;