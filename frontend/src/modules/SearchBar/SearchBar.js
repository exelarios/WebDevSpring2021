import React, { Component } from 'react'
import Logo from '../../cpp-octo-web.svg'
import './SearchBar.css'

class SearchBar extends Component {
    render() {
        return (
            <nav id="topNav" style={{backgroundColor: (this.props.sideNavActive) ? 'rgba(234, 234, 234, 0)' : '#f4f4f4', boxShadow: (this.props.sideNavActive) ? 'none' : '0px 0px 18px 0px rgba(0, 0, 0, 0.26)'}}>
                <div id="logoContainer">
                    <svg onClick={this.props.openSideNav} id="navButton" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="3.5em" width="3.5em" xmlns="http://www.w3.org/2000/svg"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
                </div>
                <input type ="search" id="searchBar" placeholder="Search" style={{opacity: (this.props.isTop || !this.props.sideNavActive) ? '1' : '0'}}></input>
                <img id="navLogo" src={Logo} style={{display: (this.props.sideNavActive) ? 'none' : 'block'}}></img>
            </nav>
        )
    }
}

export default SearchBar