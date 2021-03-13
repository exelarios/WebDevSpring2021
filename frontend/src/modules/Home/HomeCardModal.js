import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserInfo } from '../UserInfoContext'
import { useHistory } from 'react-router-dom';
import LoadingAnimation from '../../5.svg'

function HomeCardModal({ match }) {
    const [item, setItem] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [canDelete, setCanDelete] = useState(true)
    const [loading, setLoading] = useState(true)
    const { token, id } = UserInfo()
    const history = useHistory()

    useEffect(() => {
      fetchItem()
    }, [])
  
    const fetchItem = async () => {
        setLoading(true)
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
                setCanDelete(response.data.seller === id);
                return response.data
             }, (error) => {
                 console.error(error)
             });

        axios.get(`http://localhost:5000/api/users/${firstResponse.seller}`,
            settings)
            .then(response => {
                setUserInfo(response.data)
                setLoading(false)
            }, (error) => {
                console.error(error)
                setLoading(false)
            })
    }

    
    const deleteThread = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }

        axios.delete(`http://localhost:5000/api/items/${match.params.id}`,
        settings)
        .then(() => {
            history.push("/home/store")
        }, (error) => {
            console.error(error)
        })
    }

    return (
        <div className="modalScreen">
            <div className="modal mainModal">
                {loading ? (
                    <div className="loadingScreen">
                        <img src={LoadingAnimation}></img>
                        Loading...
                    </div>
                ) : (
                <>
                    <div id="mainModalImage" style={{backgroundImage: `url(${item.thumbnail.images[0]})`}}></div>
                    <div id="sideBar">
                        <div id="itemInfo">
                            <div id="itemDescription">
                                <h2>{item.name}</h2>
                                <h3>{`Posted by ${userInfo.firstName} ${userInfo.lastName}`}</h3>
                                <p>{item.description}</p>
                                <div id="bottomDescription">
                                    <nav>
                                        <button id="homeModalButton" className="siteButton">
                                            <a style={{color: "inherit", textDecoration: "none"}} href={`mailto:${userInfo.email}`}>Contact</a>
                                        </button>
                                        <button id="deleteButton" onClick={deleteThread} className="siteButton" style={{display: canDelete ? 'block' : 'none', marginLeft: '1em'}}>Delete</button>
                                    </nav>
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
                </>
                )}
                
            </div>
            <Link to="/home/store">
                <span className="exitButton"></span>
            </Link>
        </div>
    )
}

export default HomeCardModal