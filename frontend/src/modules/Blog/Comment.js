import React, { useState, useRef } from 'react';
import './Blog.css';
import { UserInfo } from '../UserInfoContext';
import axios from 'axios';

import deleteBtn from '../../trash.svg';
import updateBtn from '../../pencil.svg';
import paperPlane from '../../paper-plane.svg';

function Comment ({body, photo, postBy, id}) {

    const { name, token } = UserInfo();
    const [ update, setUpdate ] = useState(false);
    const [currentComment, setCurrentComment] = useState(body);

    const commentRef = useRef();

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

    // Switch to edit the comment
    const confirmUpdate = () => {
        setUpdate(!update);
    }

    // Update the comment
    const updateComment = async () => {
        try {
            await axios.put(`http://localhost:5000/api/comments/${id}`, {
                body: commentRef.current.value
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                }
            });
            setCurrentComment(commentRef.current.value);
            console.log(body);
            setUpdate(!update);
        }
        catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="comments">
            <div>
                <div className="userPhoto" style={{backgroundImage: `url(${photo})`}}></div>
            </div>
            <div className="comment-body">
                <h4 className="usernameComment">{postBy}</h4>
                { update ? (
                    <>
                    <input className="edit-box" type="text" id="editComment" name="editComment" defaultValue={currentComment} ref={commentRef}></input>
                    <img onClick={updateComment} src={paperPlane} style={{height: '18px'}} alt="paperplane"/>
                    </>
                )  : (
                    <p className="commentText">{currentComment}</p>
                )}
                
            </div>
            <button className="commentEdit siteButton" onClick={confirmUpdate} style={{display: postBy === name ? 'block' : 'none'}}>Edit</button>
            <button className="commentDelete deleteButtonStyle" onClick={deleteComment}style={{display: postBy === name ? 'block' : 'none'}}>Delete</button>
        </div>
    )
}

export default Comment;