import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';
import Logo from '../../cpp-octo-web.svg'
import './EntryPage.css'
import SignIn from './SignIn';
import SignUp from './SignUp';

class EntryPage extends Component {
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
                        <Route path="/entry" exact component={SignIn}/>
                        <Route path="/entry/signup" exact component={SignUp}/>
                    </Switch>
                    <img src={Logo} alt="school_logo" style={{width: '40%', marginLeft: "-25px", marginTop: "7em"}}></img>
                </div>
            </div>
        )
    }
}

export default withRouter(EntryPage)
