import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Logo from '../../cpp-octo-web.svg'
import './EntryPage.css'
import SignIn from './SignIn';
import SignUp from './SignUp';

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
            <div id="EntryPage">
                <div className="modal" id="entryModal">
                    <Switch>
                        <Route path="/entry" exact component={SignIn} />
                        <Route path="/entry/signup" component={SignUp}/>
                    </Switch>
                    <img src={Logo} style={{width: '40%', marginLeft: "-25px", marginTop: "7em"}}></img>
                </div>
            </div>
        )
    }
}
