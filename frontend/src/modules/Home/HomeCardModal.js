import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserInfo } from '../UserInfoContext'

function HomeCardModal({ match }) {
    const [item, setItem] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const { token } = UserInfo()

    useEffect(() => {
      fetchItems()
    }, [])
  
    const fetchItems = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
  
        const firstResponse = await axios.get(`http://localhost:5000/api/items/${match.params.id}`,
             settings)
             .then(response => {
                setItem(response.data)
                return response.data
             }, (error) => {
                 console.error(error)
             });

        axios.get(`http://localhost:5000/api/users/${firstResponse.seller}`,
            settings)
            .then(response => {
                setUserInfo(response.data)
            }, (error) => {
                console.error(error)
            })
    }

    return (
        <div className="modalScreen">
            <div className="modal mainModal">
                <div id="mainModalImage"></div>
                <div id="sideBar">
                    <div id="itemInfo">
                        <div id="itemDescription">
                            <h2>{item.name}</h2>
                            <h3>{`Posted by ${userInfo.firstName} ${userInfo.lastName}`}</h3>
                            <p>{item.description}</p>
                            <div id="bottomDescription">
                                <button id="homeModalButton" className="siteButton">Contact</button>
                                <h4>{`$${item.price}`}</h4>
                            </div>
                        </div>
                        <hr id="break"/>
                        <div id="commentBoxHome">
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                            <Comment />
                        </div>
                    </div>
                    <div id="commentBar">
                        <input id="comment" placeholder="Enter a comment"></input>
                    </div>
                </div>
            </div>
            <Link to="/home/store">
                <span className="exitButton"></span>
            </Link>
        </div>
    )
}

export default HomeCardModal