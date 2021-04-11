import React, { useState, useEffect } from 'react';
import FilterBox from './FilterBox';
import './RightSide.css';
import { Link } from 'react-router-dom';
import { UserInfo } from '../UserInfoContext';
import axios from 'axios';
import API_URL from '../../environment';

function RightSide() {

    const { name, id, token } = UserInfo();
    const [ profilePicture, setProfilePicture ] = useState("");
    const store = '/home/store/upload'
    const blog = '/home/blog/upload'

    useEffect(() => {
        getProfilePicture()
    }, [])

    const getProfilePicture = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }

        await axios.get(API_URL + `/api/users/${id}`,
        settings)
        .then(response => {
            setProfilePicture(response.data.picture)
        }).catch(error => {
            console.error(error)
        })
    }


    return (
        <>
            <div className="rightside">
                <div>
                    <FilterBox />
                    <Link to={(window.location.pathname === '/home/store') ? store : blog}>
                        <button id="homeUpload" className="uploadItem siteButton">Upload</button>
                    </Link>
                </div>
                <div id="userInfo">
                    <div id="userProfilePic" style={{backgroundImage: `url(${profilePicture})`}}></div>
                    <Link to={`/home/profile/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <p>{name}</p>
                    </Link>
                </div>
            </div>
        </>
        )
  }

export default RightSide