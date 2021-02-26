import React, { Component } from 'react'
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import Logo from '../../cpp-octo-web.svg'
import './EntryPage.css'
import SignIn from './SignIn';
import SignUp from './SignUp';

export default class EntryPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        }
    }



    render() {
        return (
            <div id="EntryPage">
                <div className="modal" id="entryModal">
                    <Switch>
                        <Route path="/entry" exact render={() => (
                            <SignIn setToken={this.props.setToken}/>
                        )}/>
                        <Route path="/entry/signup" component={SignUp}/>
                    </Switch>
                    <img src={Logo} alt="school_logo" style={{width: '40%', marginLeft: "-25px", marginTop: "7em"}}></img>
                </div>
            </div>
        )
    }
}
