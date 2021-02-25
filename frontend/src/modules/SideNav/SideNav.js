import Logo from '../../cpp-octo-web.svg'
import React, { Component } from 'react'
import './SideNav.css';
import { Link } from 'react-router-dom';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }

  render() {
    return (
      <nav className="sidenav" style={{left: (this.props.sideNavActive) ? '0' : '-300px'}}>
          <img src={Logo} alt="logo"/>
          <nav id="navigation">
            <Link to='/home/store'>
              <button onClick={this.props.toggleHomePage} id="home" className="sideButton">Home</button>
            </Link>
            <Link to='/home/blog'>
              <button onClick={this.props.toggleBlogPage} id="blog" className="sideButton">Blog</button>
            </Link>
          </nav>
          <Link to='/entry'>
            <button type="button" id="logButton">Login</button> 
          </Link>
          
      </nav>
    )
  }
}

export default SideNav