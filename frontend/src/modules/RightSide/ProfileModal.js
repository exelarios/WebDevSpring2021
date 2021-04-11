import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserInfo } from '../UserInfoContext';
import { Link } from 'react-router-dom';
import API_URL from '../../environment'

function ProfileModal () {
    const { token, id } = UserInfo();
    const [userInfo, setUserInfo] = useState({});
    const [confirmDel, setConfirmDel] = useState(false);
    const [vertifyStr, setVertifyStr] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const settings = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
    
            axios.get(API_URL + `/api/users/${id}`,
                settings)
                .then(response => {
                    setUserInfo(response.data);
                }, (error) => {
                    console.error(error);
                })
        };
        fetchProfile();
    }, [id, token]);

    function deleteAcc() {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }

        axios.delete(API_URL + `/api/users/delete`,
        settings)
        .then(() => {
            localStorage.clear();
        }, (error) => {
            console.error(error);
        })
    }

    const confirm = () => {
        setConfirmDel(!confirmDel);
    }

    const verify = () => {
        let enterStr = userInfo.firstName + userInfo.lastName;
        if(vertifyStr === enterStr) {
            deleteAcc();
            return (true);
        }
        return(false);
    }

    return (
        <div className="modalScreen">
            <div className="modal profileModal">
                <div className="profile">
                    <img src={userInfo.picture} alt="logo"></img>
                    <div className="profileInfo">
                        <h2>{userInfo.firstName} {userInfo.lastName}</h2>
                        <h4>{userInfo.email}</h4>
                    </div>
                </div>
                {!confirmDel ? (
                    <button onClick={confirm} id="deleteButton" className="siteButton deleteAccount">Delete Account</button>
                ): (
                    <div className="confirmForm">
                        <input type="text" 
                                className="confirm" 
                                name="confirm" 
                                placeholder={"Enter " + userInfo.firstName + userInfo.lastName + " to confirm"}
                                onChange={event => setVertifyStr(event.target.value)}
                        ></input>
                        <Link to={verify ? "/entry" : "" }>
                            <button onClick={verify} id="deleteButton" className="siteButton">Yes, delete my account</button>
                        </Link>
                        <button onClick={confirm} id="NoButton" className="siteButton">No</button>
                    </div>
                )}
                
                
            </div>
            <Link to={'/home/store'}>
                <span className="exitButton"></span>
            </Link>
            
        </div>
        
    )
}

export default ProfileModal