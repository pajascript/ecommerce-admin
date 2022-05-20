import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { login } from "../redux/apiCalls";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false);
    const user = useSelector(state =>state.user.currentUser);
    const loginFail = useSelector(state => state.user.error);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        
                login(dispatch, { username, password });
                if (username !== "jpatrick") {
                    setError(true)
                }else {
                    history.push("/home")
                }
    };

    return (
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
            required  
        />
        <input 
            style={{
                padding: 10,
                marginBottom: 20
            }} 
            type="password" 
            placeholder='Password' 
            onChange={e => setPassword(e.target.value)}
            required
        />
        {error && <div style={{color: "red"}} >Incorrect username or password</div>}
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