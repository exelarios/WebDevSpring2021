import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserInfo } from '../UserInfoContext';
import LoadingAnimation from '../../5.svg';
import { API_URL } from '../MainPage';


function ThreadCardModal({ match }) {
    const [thread, setThread] = useState({});
    const [author, setAuthor] = useState({});
    const [canDelete, setCanDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const { token, id } = UserInfo();

    useEffect(() => {
      fetchThread()
    }, [])
  
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

    const deleteThread = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }

        axios.delete(API_URL + `/api/posts/${match.params.id}`,
        settings)
        .then(() => {
        }, (error) => {
            console.error(error);
        })
    }

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
                                <p className="threadInfo" id="datetime">Posted: MM/DD/YYYY</p>
                                <p className="threadInfo" id="threadTopic">Topic: { thread.topic }</p>
                            </div>
                            <div className="threadWritter">
                                <p>{ author.firstName } { author.lastName }</p>
                                <img src={author.picture} alt="logo"></img>
                            </div>
                        </div>
                        <p id="threadContain">{ thread.body }</p>
                        <Link to="/home/blog" onClick={deleteThread} style={{textDecoration: "none", width: "45%"}}>
                            <button id="deleteButton" className="siteButton" style={{display: canDelete ? 'block' : 'none'}}>Delete</button>
                        </Link>
                    </div>
                    
                    <div className="threadComments">
                        <Comment />
                        <Comment />
                    </div>
                    
                    <div className="comment">
                        <input id="commentBox" placeholder="Enter a comment"></input>
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