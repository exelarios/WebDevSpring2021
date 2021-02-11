import React, { Component } from 'react'
import Comment from './Comment'

class HomeCardModal extends Component {
    render() {
        return (
            <div className="modalScreen" style={{display: (this.props.modalActive) ? 'flex' : 'none'}}>
                <div className="modal mainModal">
                    <div id="mainModalImage"></div>
                    <div id="sideBar">
                        <div id="itemInfo">
                            <div id="itemDescription">
                                <h2>Item Title</h2>
                                <h3>Posted by John Doe</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at elementum urna. Vivamus quis dolor sed lacus fringilla fringilla. Phasellus ultricies sit amet tortor nec pellentesque. Integer non fermentum enim. Sed maximus libero nisi, sed mollis est interdum id. Fusce nec tortor purus. Quisque non mollis felis, ut dignissim libero. Mauris eget sapien vulputate, fringilla ipsum ut, mollis massa. Donec a erat leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at elementum urna. Vivamus quis dolor sed lacus fringilla fringilla. Phasellus ultricies sit amet tortor nec pellentesque. Integer non fermentum enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at elementum urna. Vivamus quis dolor sed lacus fringilla fringilla. Phasellus ultricies sit amet tortor nec pellentesque. Integer non fermentum enim. Sed maximus libero nisi, sed mollis est interdum id. Fusce nec tortor purus. Quisque non mollis felis, ut dignissim libero. Mauris eget sapien vulputate, fringilla ipsum ut, mollis massa. Donec a erat leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at elementum urna. Vivamus quis dolor sed lacus fringilla fringilla. Phasellus ultricies sit amet tortor nec pellentesque. Integer non fermentum enim.</p>
                                <div id="bottomDescription">
                                    <button id="homeModalButton" className="siteButton">Contact</button>
                                    <h4>$300.00</h4>
                                </div>
                            </div>
                            <hr id="break"/>
                            <div id="commentBox">
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                                <Comment />
                            </div>
                        </div>
                        <div id="commentBar">
                            <input id="comment" placeholder="Enter a comment"></input>
                        </div>
                    </div>
                </div>
                <span className="exitButton" onClick={this.props.toggleModal}></span>
            </div>
        )
    }
}

export default HomeCardModal