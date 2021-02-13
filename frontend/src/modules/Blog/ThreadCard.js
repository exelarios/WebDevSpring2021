import React, { Component } from 'react'

export default class ThreadCard extends Component {
    render() {
        return (
            <div className="threadCard">
                <div className="details">
                    <h2 className="threadTitle">{this.props.title}</h2>
                    <p className="info" id="author">Posted by: {this.props.author}</p>
                    <p className="info" id="topic">Topic: {this.props.topic}</p>
                    <blockquote className="summary">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil tempora possimus harum recusandae...</p>
                    </blockquote>
                </div>
            </div>
        )
    }
}