import React, { Component } from 'react'

export default class SignUp extends Component {
    render() {
        return (
            <>
                <h2>Sign Up</h2>
                <form id="signUpForm" className="signForm">
                    <label className="labelEntry" htmlFor="email">Email:</label>
                    <input type="email" className="entryInput" name="email"></input>
                    <label className="labelEntry" htmlFor="password">Password:</label>
                    <input type="password" className="entryInput" name="password"></input>
                    <label className="labelEntry" htmlFor="firstName">First Name:</label>
                    <input className="entryInput" name="firstName"></input>
                    <label className="labelEntry" htmlFor="lastName">Last Name:</label>
                    <input className="entryInput" name="lastName"></input>
                    <label id="labelForFile" htmlFor="file" className="uploadInput">Upload Profile Picture:</label>
                    <input id="inputFile" name="file" type="file" className="uploadInput"></input>
                    <button className="uploadItem entryButton">Submit</button>
                </form>
            </>
        )
    }
}
