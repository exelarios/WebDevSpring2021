import Logo from '../../cpp-octo-web.svg'
import React, {  } from 'react'
import './SideNav.css';
import { Link } from 'react-router-dom';
import { UserInfo, HomeFilterUpdate, BlogFilterUpdate, RefreshStore } from '../UserInfoContext'

const SideNav = (props) => {
  const { homeFilter, blogFilter, token } = UserInfo()
  const updateHomeFilter = HomeFilterUpdate()
  const updateBlogFilter = BlogFilterUpdate()
  const refreshStore = RefreshStore();

  const setDefaultFilter = (type) => {
    let newArr = (type === "home") ? [...homeFilter] : [...blogFilter]
    newArr.forEach(item => {
      item.checked = false;
    })
    if(type === "home") { //If you are clicking on the blog page button
      updateHomeFilter(newArr)
    } else { //If you are clicking on the home page button
      refreshStore();
      updateBlogFilter(newArr)
    }
}

  return (
    <nav className="sidenav" style={{left: (props.sideNavActive) ? '0' : '-300px'}}>
        <img src={Logo} alt="logo"/>
        <nav id="navigation">
          <Link to='/home/store' onClick={() => setDefaultFilter("blog")}>
            <button onClick={props.toggleHomePage} id="home" className="sideButton">Home</button>
          </Link>
          <Link to='/home/blog' onClick={() => setDefaultFilter("home")}>
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