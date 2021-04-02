import React, { useState, useEffect } from 'react'
import { UserInfo } from '../UserInfoContext';
import axios from 'axios';

function Comment({body, photo, postBy, id, setRefresh, setComments}) {
    const { name, token } = UserInfo();
    const [commentText, setCommentText] = useState(body);
    const [editingComment, setEditingComment] = useState(false);
    const settings = {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
        }
    }

    const deleteComment = async () => {
        axios.delete(`http://localhost:5000/api/comments/${id}`,
        settings)
        .then(() => {
            setComments([]);
            setRefresh(true);
        }, (error) => {
            console.error(error);
        })
    }

    const editComment = async () =>  {
        setEditingComment(false);
        axios.put(`http://localhost:5000/api/comments/${id}`,
        {
            body: commentText
        },
        settings)
        .then(() => {
        }, (error) => {
            console.log(id);
            console.error(error);
        })
    }

    const onEnter = e => {
        if(e.key === "Enter") {
            editComment();
        }
    }

    return (
        <div className="comments">
            <div className="userPhoto" style={{backgroundImage: `url(${photo})`}}></div>
            <h3 className="usernameComment">{postBy}</h3>
            <p className="commentText" style={{display: editingComment ? "none" : "block"}}>{commentText}</p>
            <button className="commentEdit siteButton" onClick={() => setEditingComment(true)} style={{display: postBy === name ? 'block' : 'none'}}>Edit</button>
            <button className="commentDelete deleteButtonStyle" onClick={deleteComment}style={{display: postBy === name ? 'block' : 'none'}}>Delete</button>
            <div className="editComment" style={{display: editingComment ? "block" : "none"}}> 
                <textarea onKeyDown={onEnter} onChange={e => setCommentText(e.target.value)} defaultValue={commentText}></textarea>
            </div>
        </div>
    )
}

export default Comment;
