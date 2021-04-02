import React, { useEffect, useState, useRef } from 'react';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserInfo, RefreshPage } from '../UserInfoContext';
import { useHistory } from 'react-router-dom';
import LoadingAnimation from '../../5.svg';
import { API_URL } from '../MainPage';
import useRenderComments from '../hooks/useRenderComments';

import paperPlane from '../../paper-plane.svg';

function ThreadCardModal({ match }) {
    const [thread, setThread] = useState({});
    const [author, setAuthor] = useState({});
    const [comments, setComments] = useState([]);
    const [commentPageNumber, setCommentPageNumber] = useState(1);
    const [canDelete, setCanDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token, id } = UserInfo();
    const { storeLoading, storeHasMore } = useRenderComments(token, setComments, commentPageNumber, match.params.id);
    const history = useHistory();
    const refreshStore = RefreshPage();
    
    const commentRef = useRef();

    useEffect(() => {
        const fetchThread = async () => {
            const settings = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            }
      
            const threadInfo = await axios.get(API_URL + `/api/posts/${match.params.id}`,
                 settings)
                 .then(response => {
                    setThread(response.data);
                    setCanDelete(response.data.postBy === id);
                    return response.data;
                 }, (error) => {
                     console.error(error);
                 });
    
            axios.get(API_URL + `/api/users/${threadInfo.postBy}`,
                settings)
                .then(response => {
                    setAuthor(response.data);
                    setLoading(false);
                }, (error) => {
                    setAuthor({firstName: "Deleted User",
                                 lastName: ""});
                    console.error(error);
                    setLoading(false);
                })
        };
        fetchThread();
    }, [id, match.params.id, token])

    const deleteThread = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }

        axios.delete(`http://localhost:5000/api/posts/${match.params.id}`,
        settings)
        .then(() => {
            window.location.href="/home/blog";
        }, (error) => {
            console.error(error);
        })
    }

    const addComment = async () => {
        try {
            await axios.post(`http://localhost:5000/api/comments/${match.params.id}/add`, {
                body: commentRef.current.value
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    const submitComment = (e) => {
        if (commentRef.current.value) {
            e.preventDefault()
            addComment();
            // setComments(comments => [...comments, commentRef.current.value]);
            // setComments([...comments, commentRef.current.value]);
            // history.push("/home/blog/" + match.params.id);
            window.location.reload();
        }
    };
    
    return (
        <div className="modalScreen">
            <div className="modal blogModal">
                {loading ? (
                    <div className="loadingScreen">
                        <img src={LoadingAnimation}></img>
                        Loading...
                    </div>
                ) : (
                <>
                    <div className="threadPosting">
                        <div className="threadDetail">
                            <div>
                                <h2 className="threadTitle">{ thread.title }</h2>
                                {/*<p className="threadInfo" id="datetime">Posted: MM/DD/YYYY</p>*/}
                                <p className="threadInfo" id="threadTopic">Topic: { thread.topic }</p>
                            </div>
                            <div className="threadWritter">
                                <p>{ author.firstName } { author.lastName }</p>
                                <img src={author.picture} alt="logo"></img>
                            </div>
                        </div>
                        <p id="threadContain">{ thread.body }</p>
                        <Link to="/home/blog" onClick={deleteThread} style={{textDecoration: "none", width: "45%"}}>
                            <button id="deleteButton" className="deleteButtonStyle" style={{display: canDelete ? 'block' : 'none'}}>Delete</button>
                        </Link>
                    </div>
                    
                    <div className="threadComments">
                        {comments.map(comment => {
                            return <Comment key={comment._id} body={comment.body} postBy={comment.postBy} photo={comment.itemId} id={comment._id} />
                        })
                        }
                    </div>
                    
                    <div className="comment">
                        <input id="commentBox" placeholder="Enter a comment" style={{display: 'inline'}} ref={commentRef}></input>
                        <img onClick={submitComment} src={paperPlane} style={{height: '18px'}} alt="paperplane"/>
                    </div>
                </>
                )}
            </div>
            <Link to="/home/blog/">
                <span className="exitButton"></span>
            </Link>
        </div>
    );
    
}

export default ThreadCardModal