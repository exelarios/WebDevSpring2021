import React, { useState } from 'react';
import './Blog.css';
import { UserInfo } from '../UserInfoContext';
import axios from 'axios';

import deleteBtn from '../../trash.svg';
import updateBtn from '../../pencil.svg';

function Comment ({body, photo, postBy, id}) {

    const { name, token } = UserInfo();
    const [ update, setUpdate ] = useState(false);

    // Delete a comment and reload the modal
    const deleteComment = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        axios.delete(`http://localhost:5000/api/comments/${id}`,
        settings)
        .then(() => {
            window.location.reload();
        }, (error) => {
            console.error(error);
        })
    }

    const confirmUpdate = () => {
        setUpdate(!update);
    }

    const updateComment = async () => {
        const settings = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            }
        }
        axios.delete(`http://localhost:5000/api/comments/`,
        settings)
        .then(() => {
        }, (error) => {
            console.error(error);
        })
    }
    return (
        <div className="comments">
            <div>
                <div className="userPhoto" style={{backgroundImage: `url(${photo})`}}></div>
            </div>
            <div>
                <h4 className="usernameComment">{postBy}</h4>
                { update ? (
                    <input className="edit-box" value={body}></input>
                )  : (
                    <p className="commentText">{body}</p>
                )}
                
            </div>
            <div className='editBtn'>
                <img onClick={confirmUpdate} className='editComment' src={updateBtn} style={{display: postBy === name ? 'block' : 'none'}} alt="update"/>
                <img onClick={deleteComment} className='editComment' src={deleteBtn} style={{display: postBy === name ? 'block' : 'none'}} alt="delete"/>
            </div>
        </div>
    )
}

export default Comment;