import Logo from '../../cpp-octo-web.svg'
import React, { Component } from 'react'
import './SideNav.css';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  render() {
    console.log(this.props)
    return (
      <nav class="sidenav">
          <img src={Logo} alt="logo"/>
          <nav id="navigation">
              <button id="home" className="sideButton">Home</button>
              <button id="blog" className="sideButton">Blog</button>
          </nav>
          <button onClick={this.props.openFirstPage} type="button" id="logButton">Login</button> 
      </nav>
    )
  }
}

export default SideNav