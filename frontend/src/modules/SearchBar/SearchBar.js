import React, { useState } from 'react'
import Logo from '../../cpp-octo-web.svg'
import Menu from '../../menu.svg'
import { useHistory } from 'react-router-dom'
import { NameQueryUpdate, StorePageNumberUpdate, UserInfo } from '../UserInfoContext'
import './SearchBar.css'
import axios from 'axios'

function SearchBar(props) {
    const history = useHistory();
    const [searchQuery, setSearchQuery] = useState("");
    const { token } = UserInfo();
    const [suggestedSearchActive, setSuggestedSearchActive] = useState(false);
    const [suggestedSearches, setSuggestedSearches] = useState([]);
    const updateNameQuery = NameQueryUpdate();
    const setPageNumber = StorePageNumberUpdate();

    const handleSearch = e => {
        setSearchQuery(e.target.value);
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        axios.get(`http://localhost:5000/api/items/search?&name=${e.target.value}&page=1`,
        settings)
        .then(response => {
            setSuggestedSearches(response.data.items.splice(0, 4));
        }, (error) => {
            console.error(error)
            return []
        })
        setSuggestedSearchActive((e.target.value !== "") ? true : false);
    }

    const submitSearch = e => {
        if(e.key === "Enter") {
            setSuggestedSearchActive(false);
            updateNameQuery("store", searchQuery);
            setPageNumber(1);
        }
    }

    const handleSuggestedSearch = id => {
        setSuggestedSearchActive(false);
        history.push(`/home/store/${id}`);
    }

    return (
        <nav id="topNav" style={{backgroundColor: (props.sideNavActive) ? 'rgba(234, 234, 234, 0)' : '#f4f4f4', boxShadow: (props.sideNavActive) ? 'none' : '0px 0px 18px 0px rgba(0, 0, 0, 0.26)'}}>
            <img src={Menu} id="navButton" onClick={props.openSideNav}></img>
            <div id="searchContainer">
                <input autoComplete="off" onKeyDown={submitSearch} type="search" onChange={handleSearch} id="searchBar" placeholder="Search" style={{opacity: (props.isTop || !props.sideNavActive) ? '1' : '0'}}></input>
                <div id="suggestedSearchContainer" style={{display: suggestedSearchActive ? "block" : "none"}}>
                    {suggestedSearches.map(suggestion => {
                        return <div key={suggestion._id} onClick={() => handleSuggestedSearch(suggestion._id)}className="suggestedSearch">{suggestion.name}</div>
                    })}
                </div>
            </div>
            <img id="navLogo" alt="school_logo" src={Logo} style={{display: (props.sideNavActive) ? 'none' : 'block'}}></img>
        </nav>
    )
}

export default SearchBar