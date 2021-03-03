import React, { Component } from 'react'

export default class ThreadCard extends Component {
    render() {
        return (
            <div className="threadCard" onClick={this.props.toggleModal}>
                <div className="details">
                    <h2 className="threadTitle">{this.props.title}</h2>
                    <p className="info" id="author">Posted by: {this.props.author}</p>
                    <p className="info" id="topic">Topic: {this.props.topic}</p>
                    <blockquote className="summary">
                        <p>{ this.props.summary }</p>
                    </blockquote>
                </div>
            </div>
        )
    }
}