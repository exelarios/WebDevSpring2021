import React, { Component } from 'react'
import Logo from '../../cpp-octo-web.svg'

export default class EntryPage extends Component {
    constructor(props) {
        super(props);
        this.firstPage = React.createRef();
        this.state = { 
            type: "Sign In"
        }
    }

    render() {
        console.log(this.props)
        return (
            <div id="EntryPage" style={{display: (this.props.activeEntryPage) ? 'flex' : 'none'}} ref={this.firstPage}>
                <div className="modal" id="entryModal">
                    <h2>{this.state.type}</h2>
                    <form>
                        <label className="labelEntry" htmlFor="username">Username:</label>
                        <input className="entryInput" name="username"></input>
                        <label className="labelEntry" htmlFor="password">Password:</label>
                        <input type="password" className="entryInput" name="password"></input>
                        <button className="uploadItem entryButton">Submit</button>
                    </form>
                    <img src={Logo} style={{width: '40%', marginLeft: "-25px", marginTop: "7em"}}></img>
                </div>
            </div>
        )
    }
}
