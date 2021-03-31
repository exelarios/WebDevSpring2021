import React, { useEffect, useState, useRef } from 'react'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserInfo, RefreshStore } from '../UserInfoContext'
import { useHistory } from 'react-router-dom';
import LoadingAnimation from '../../5.svg';
import useRenderComments from '../hooks/useRenderComments'

function HomeCardModal({ match }) {
    const [item, setItem] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [currentComment, setCurrentComment] = useState("");
    const [comments, setComments] = useState([]);
    const [commentPageNumber, setCommentPageNumber] = useState(1);
    const [canDelete, setCanDelete] = useState(true);
    const [loading, setLoading] = useState(true);
    const { token, id } = UserInfo();
    const { commentsLoading, storeHasMore } = useRenderComments(token, setComments, commentPageNumber, match.params.id);
    const history = useHistory();
    const refreshStore = RefreshStore();
    const commentRef = useRef();

    useEffect(() => {
      fetchItem();
    }, []);
  
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
                setItem(response.data);
                setCanDelete(response.data.seller === id);
                return response.data;
             }, (error) => {
                 console.error(error);
             });

        axios.get(`http://localhost:5000/api/users/${firstResponse.seller}`,
            settings)
            .then(response => {
                setUserInfo(response.data);
                setLoading(false);
            }, (error) => {
                setUserInfo({firstName: "Deleted User",
                             lastName: ""})
                console.error(error);
                setLoading(false);
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
            refreshStore()
            history.push("/home/store")
        }, (error) => {
            console.error(error);
        })
    }

    const addComment = async e => {
        if(e.key === "Enter" && currentComment !== "") {
            try {
                await axios.post(`http://localhost:5000/api/comments/${match.params.id}/add`, {
                    body: currentComment
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token
                    }
                }).then(() => {
                    setCurrentComment("");
                    setCommentPageNumber(2)
                    setCommentPageNumber(1);
                    console.log(comments);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
        
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
                                {commentsLoading ? (
                                    <div className="container loadPage">
                                        <img src={LoadingAnimation}></img>
                                        Loading...
                                    </div>
                                )
                                : comments.map(comment => {
                                    return <Comment key={comment._id} body={comment.body} postBy={comment.postBy} photo={comment.itemId}/>
                                })
                                }
                            </div>
                        </div>
                        <div id="commentBar">
                            <input autoComplete="off" onKeyDown={addComment} id="comment" placeholder="Enter a comment" value={currentComment} onChange={e => setCurrentComment(e.target.value)}></input>
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