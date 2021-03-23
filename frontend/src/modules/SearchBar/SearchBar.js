import React from 'react'
import Logo from '../../cpp-octo-web.svg'
import Menu from '../../menu.svg'
import { NameQueryUpdate, StorePageNumberUpdate } from '../UserInfoContext'
import './SearchBar.css'

function SearchBar(props) {
    const updateNameQuery = NameQueryUpdate()
    const setPageNumber = StorePageNumberUpdate()

    function handleSearch(e) {
        updateNameQuery("store", e.target.value)
        setPageNumber(1)
    }

    return (
        <nav id="topNav" style={{backgroundColor: (props.sideNavActive) ? 'rgba(234, 234, 234, 0)' : '#f4f4f4', boxShadow: (props.sideNavActive) ? 'none' : '0px 0px 18px 0px rgba(0, 0, 0, 0.26)'}}>
            <img src={Menu} id="navButton" onClick={props.openSideNav}></img>
            <input type="search" onChange={handleSearch} id="searchBar" placeholder="Search" style={{opacity: (props.isTop || !props.sideNavActive) ? '1' : '0'}}></input>
            <img id="navLogo" alt="school_logo" src={Logo} style={{display: (props.sideNavActive) ? 'none' : 'block'}}></img>
        </nav>
    )
}

export default SearchBar