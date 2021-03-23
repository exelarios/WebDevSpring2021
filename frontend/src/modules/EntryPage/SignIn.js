import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { UserInfoUpdate } from '../UserInfoContext'

function SignIn() {
    const history = useHistory();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const updateUser = UserInfoUpdate();
    const [formFailed, setFormFailed] = useState(false);

    const postLogIn = async () => {
        axios.post('http://localhost:5000/api/auth/login', {
            email: usernameRef.current.value,
            password: passwordRef.current.value
        })
        .then((response) => {
            updateUser(response.data);
            history.push("/home/store")
        }, (error) => {
            setFormFailed(true)
            console.log(error);
        })
    }

    const onLoginSubmit = e => {
        e.preventDefault()
        postLogIn()
    }

    return (
        <>
            <h2>Sign In</h2>
            <form id="signInForm" className="signForm">
                <label className="labelEntry" htmlFor="username">Email:</label>
                <input className="entryInput" name="username" ref={usernameRef}></input>
                <label className="labelEntry" htmlFor="password">Password:</label>
                <input type="password" className="entryInput" name="password" ref={passwordRef}></input>
                <Link to="/entry/signup">
                    <p id="signUpLink">Sign Up</p>
                </Link>   
                <button type="submit" onClick={onLoginSubmit} className="uploadItem entryButton linkMargin">Submit</button>
                {formFailed && <h3 className="errorMessage">Either email or password is incorrect. Try again.</h3>}
            </form>
        </>
    )
    
}

export default SignIn