import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { login } from "../redux/apiCalls";
import { Container, Wrapper, Title, Form, Input, Button, Link, Error } from './LoginElements';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)
    const user = useSelector(state =>state.user.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
        history.push("/home")
    };  

    return (
        <Container>
            <Wrapper>
                <Title>LOG IN</Title>
                <Form>
                    <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                    <Input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                    <Button onClick={handleClick} >LOGIN</Button>
                </Form>
            </Wrapper>
        </Container>
    //     <div 
    //     style={{
    //         height: "100vh",
    //         display: "flex", 
    //         flexDirection: "column",
    //         alignItems: "center",
    //         justifyContent: "center"
    //     }} 
    // >
    //     <input
    //         style={{
    //             padding: 10,
    //             marginBottom: 20
    //         }} 
    //         type="text" 
    //         placeholder='Username'  
    //         onChange={e => setUsername(e.target.value)}  
    //         required  
    //     />
    //     <input 
    //         style={{
    //             padding: 10,
    //             marginBottom: 20
    //         }} 
    //         type="password" 
    //         placeholder='Password' 
    //         onChange={e => setPassword(e.target.value)}
    //         required
    //     />
    //     {error && <div style={{color: "red"}} >Incorrect username or password</div>}
    //     <button 
    //         style={{
    //             padding: 10,
    //             width: 100,
    //             cursor: "pointer"
    //         }}
    //         onClick={handleClick} 
    //     >Login</button>
    // </div>
    )
}

export default Login;