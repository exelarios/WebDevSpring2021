import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserInfo } from '../UserInfoContext';
import { Link } from 'react-router-dom';

function ProfileModal () {
    const { token, id } = UserInfo();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }

        axios.get(`http://localhost:5000/api/users/${id}`,
            settings)
            .then(response => {
                setUserInfo(response.data);
            }, (error) => {
                console.error(error);
            })
    }

    const deleteAcc = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }

        axios.delete(`http://localhost:5000/api/users/delete`,
        settings)
        .then(() => {
            localStorage.clear();
        }, (error) => {
            console.error(error);
        })
    }


    return (
        <div className="modalScreen">
            <div className="modal profileModal">
                <h1>Profile Info</h1>
                <div className="profile">
                    <img src={userInfo.picture} alt="logo"></img>
                    <div className="profileInfo">
                        <h5>Full Name</h5>
                        <p>{userInfo.firstName} {userInfo.lastName}</p>
                        <h5>Email</h5>
                        <p>{userInfo.email}</p>
                    </div>
                </div>
                <Link to="/home/blog" onClick={deleteAcc} style={{textDecoration: "none", width: "45%"}}>
                    <button id="deleteButton" className="siteButton deleteAccount">Delete Account</button>
                </Link>
            </div>
            <Link to={'/home/store'}>
                <span className="exitButton"></span>
            </Link>
            
        </div>
        
    )
}

export default ProfileModal