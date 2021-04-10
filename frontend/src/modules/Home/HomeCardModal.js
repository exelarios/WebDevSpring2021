import React, { useEffect, useState, useRef } from 'react'
import Comment from './Comment'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserInfo, RefreshPage } from '../UserInfoContext'
import { useHistory } from 'react-router-dom';
import LoadingAnimation from '../../5.svg';
import useRenderComments from '../hooks/useRenderComments'

function HomeCardModal({ match }) {
    const [item, setItem] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [currentComment, setCurrentComment] = useState("");
    const [comments, setComments] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [commentPageNumber, setCommentPageNumber] = useState(1);
    const [canDelete, setCanDelete] = useState(true);
    const [loading, setLoading] = useState(true);
    const { token, id } = UserInfo();
    const { commentsLoading, storeHasMore } = useRenderComments(token, setComments, commentPageNumber, match.params.id, setRefresh, refresh);
    const history = useHistory();
    const refreshStore = RefreshPage();

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
    const registerInputSubmit = e => {
        if(e.key === "Enter" && currentComment !== "") {
            addComment()
        }
    }
    const addComment = async () => {
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
                setRefresh(true);
            });
        }
        catch (error) {
            console.error(error);
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
                                        <button id="deleteButton" onClick={deleteThread} className="deleteButtonStyle" style={{display: canDelete ? 'block' : 'none', marginLeft: '1em'}}>Delete</button>
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
                                    return <Comment key={comment._id} body={comment.body} setComments={setComments} postBy={comment.postBy} setRefresh={setRefresh} id={comment._id} photo={comment.photo}/>
                                })
                                }
                            </div>
                        </div>
                        <div id="commentBar">
                            <input autoComplete="off" onKeyDown={registerInputSubmit} id="comment" placeholder="Enter a comment" value={currentComment} onChange={e => setCurrentComment(e.target.value)}></input>
                            <button onClick={addComment} id="commentSubmit" className="siteButton">Submit</button>
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