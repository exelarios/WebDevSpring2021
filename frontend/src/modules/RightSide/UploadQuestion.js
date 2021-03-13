import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserInfo } from '../UserInfoContext';

function UploadQuestion () {
    const { token } = UserInfo();
    const history = useHistory();
    
    const titleRef = useRef();
    const bodyRef = useRef();
    const topicRef = useRef();

    const addThread = async () => {
        try {
            await axios.post('http://localhost:5000/api/posts/add', {
                title: titleRef.current.value,
                body: bodyRef.current.value,
                topic: topicRef.current.value
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
    const submitThread = (e) => {
        e.preventDefault()
        addThread();
        history.push("/home/blog")
    };

    return (
        <>
            <div className="modalHeader">
                <h2>Ask a Question</h2>
            </div>
            <div className="modalBody">
                <form onSubmit={submitThread} className="uploadForm">
                    <input id="questionTitle" className="uploadInput" name="title" placeholder="Type a title" ref={titleRef}></input>
                    <textarea id="questionText" className="uploadInput" placeholder="Type a Question" ref={bodyRef}></textarea>
                    <select className="uploadInput typeInput" defaultValue={'Others'} ref={topicRef}>
                        <option id="optionPlaceholder" value="DEFAULT" disabled={true}>Choose a topic</option>
                        <option value="Housing">Housing</option>
                        <option value="Classes">Classes</option>
                        <option value="Items">Items</option>
                        <option value="Events">Events</option>
                        <option value="Others">Others</option>
                    </select>
                    <button type="submit" 
                            className="uploadItem uploadModalButton siteButton">Send
                    </button>
                </form>
            </div>
        </>
        
    )
}

export default UploadQuestion
