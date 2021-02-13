import React, { Component } from 'react'
import Logo from '../../cpp-octo-web.svg'
import './EntryPage.css'

export default class EntryPage extends Component {
    constructor(props) {
        super(props);
        this.firstPage = React.createRef();
        this.state = { 
            type: "Sign In",
            signUpActive: false
        }
    }

    signUpToggle = () => {
        this.setState({
            type: "Sign Up",
            signUpActive: true
        })
    }

    render() {
        return (
            <div id="EntryPage" style={{display: (this.props.activeEntryPage) ? 'flex' : 'none'}} ref={this.firstPage}>
                <div className="modal" id="entryModal">
                    <h2>{this.state.type}</h2>
                    <form id="signInForm" className="signForm" style={{display: (this.state.signUpActive) ? 'none' : 'flex'}}>
                        <label className="labelEntry" htmlFor="username">Username:</label>
                        <input className="entryInput" name="username"></input>
                        <label className="labelEntry" htmlFor="password">Password:</label>
                        <input type="password" className="entryInput" name="password"></input>
                        <a id="signUpLink" onClick={this.signUpToggle}>Sign Up</a>
                        <button className="uploadItem entryButton">Submit</button>
                    </form>
                    <form id="signUpForm" className="signForm" style={{display: (this.state.signUpActive) ? 'flex' : 'none'}}>
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
                    <img src={Logo} style={{width: '40%', marginLeft: "-25px", marginTop: "7em"}}></img>
                </div>
            </div>
        )
    }
}
