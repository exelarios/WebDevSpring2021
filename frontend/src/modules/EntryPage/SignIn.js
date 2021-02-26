import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import history from '../history'

export default function SignIn({ setToken }) {
    const usernameRef = useRef()
    const passwordRef = useRef()

    const postLogIn = async () => {
        axios.post('http://localhost:5000/api/auth/login', {
            email: usernameRef.current.value,
            password: passwordRef.current.value
        })
        .then((response) => {
            console.log(response)
            setToken(response.data.token)
        }, (error) => {
            console.log(error)
        })
    }

    const onLoginSubmit = (e) => {
        e.preventDefault()
        postLogIn()
    }

    return (
        <>
            <h2>Sign In</h2>
            <form onSubmit={onLoginSubmit} id="signInForm" className="signForm">
                <label className="labelEntry" htmlFor="username">Username:</label>
                <input className="entryInput" name="username" ref={usernameRef}></input>
                <label className="labelEntry" htmlFor="password">Password:</label>
                <input type="password" className="entryInput" name="password" ref={passwordRef}></input>
                <Link to="/entry/signup">
                    <p id="signUpLink">Sign Up</p>
                </Link>   
                <button 
                    type="submit" 
                    className="uploadItem entryButton"
                    onClick={() => history.push('/home/store')}
                >Submit</button>
            </form>
        </>
    )
    
}