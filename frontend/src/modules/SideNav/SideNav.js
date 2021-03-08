import Logo from '../../cpp-octo-web.svg'
import React, {  } from 'react'
import './SideNav.css';
import { Link } from 'react-router-dom';
import { UserInfo, HomeFilterUpdate, BlogFilterUpdate } from '../UserInfoContext'

const SideNav = (props) => {
  const { homeFilter, blogFilter } = UserInfo()
  const updateHomeFilter = HomeFilterUpdate()
  const updateBlogFilter = BlogFilterUpdate()

  const setDefaultFilter = (type) => {
    let newArr = (type === "home") ? [...homeFilter] : [...blogFilter]
    newArr.forEach(item => {
      item.checked = false;
    })
    if(type === "home") {
      updateHomeFilter(newArr)
    } else {
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
        <Link to='/entry'>
          <button type="button" id="logButton">Login</button> 
        </Link>
        
    </nav>
  )
}

export default SideNav