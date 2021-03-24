import React, { Component } from 'react'

class Comment extends Component {
    render() {
        return (
            <div className="comments">
                <div className="userPhoto" style={{backgroundImage: `url(${this.props.photo})`}}></div>
                <h3 className="usernameComment">{this.props.postBy}</h3>
                <p className="commentText">{this.props.body}</p>
            </div>
        )
    }
}

export default Comment;
