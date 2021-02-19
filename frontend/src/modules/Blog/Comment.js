import React, { Component } from 'react'

class Comment extends Component {
    render() {
        return (
            <div className="comments">
                <div className="userPhoto"></div>
                <h3 className="usernameComment">User Name</h3>
                <p className="commentText">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at elementum urna. Vivamus quis dolor sed lacus fringilla fringilla. Phasellus ultricies sit amet tortor nec pellentesque.</p>
            </div>
        )
    }
}

export default Comment;