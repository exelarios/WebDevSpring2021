import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignIn extends Component {
    render() {
        return (
            <>
                <h2>Sign In</h2>
                <form id="signInForm" className="signForm">
                    <label className="labelEntry" htmlFor="username">Username:</label>
                    <input className="entryInput" name="username"></input>
                    <label className="labelEntry" htmlFor="password">Password:</label>
                    <input type="password" className="entryInput" name="password"></input>
                    <Link to="/entry/signup">
                        <p id="signUpLink">Sign Up</p>
                    </Link>   
                    <button className="uploadItem entryButton">Submit</button>
                </form>
            </>
        )
    }
}
