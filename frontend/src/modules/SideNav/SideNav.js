import Logo from '../../cpp-octo-web.svg'
import React, {  } from 'react'
import './SideNav.css';
import { Link } from 'react-router-dom';
import { UserInfo, PageUpdate } from '../UserInfoContext'

const SideNav = (props) => {
  const { storeFilter, blogFilter, token } = UserInfo();
  const pageUpdate = PageUpdate();

  const setDefaultFilter = (type) => {
    let newArr = (type === "store") ? [...storeFilter] : [...blogFilter]
    newArr.forEach(item => {
      item.checked = false;
    })
    if(type === "store") { //If you are clicking on the blog page button
      pageUpdate("blog");
    } else { //If you are clicking on the home page button
      pageUpdate("store");
    }
}

  return (
    <nav className="sidenav" style={{left: (props.sideNavActive) ? '0' : '-300px'}}>
        <img src={Logo} alt="logo"/>
        <nav id="navigation">
          <Link to='/home/store' onClick={() => setDefaultFilter("blog")}>
            <button onClick={props.toggleHomePage} id="store" className="sideButton">Store</button>
          </Link>
          <Link to='/home/blog' onClick={() => setDefaultFilter("store")}>
            <button onClick={props.toggleBlogPage} id="blog" className="sideButton">Blog</button>
          </Link>
        </nav>
        <Link to='/entry' onClick={() => (token !== 'none') ? localStorage.clear() : null}>
          <button type="button" id="logButton">{(token !== 'none') ? 'Logout' : 'Login'}</button> 
        </Link>
        
    </nav>
  )
}

export default SideNav