import React, { Component } from 'react'
import Comment from './Comment'


class ThreadCardModal extends Component {
    render() {
        return (
            <div className="modalScreen" style={{ display: (this.props.modalActive) ? 'flex' : 'none' }}>
                <div className="modal blogModal">
                    <div class="threadPosting">
                        <div class="threadDetail">
                            <div>
                                <h2 className="threadTitle">Thread Title Here</h2>
                                <p className="threadInfo" id="datetime">Posted: MM/DD/YYYY</p>
                                <p className="threadInfo" id="threadTopic">Topic: Housing</p>
                            </div>
                            <div className="threadWritter">
                                <span>John Doe</span>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXZlaUXIWozu3xqknYB3S9nknCPGFPAEVZLA&usqp=CAU" alt="logo"></img>
                            </div>
                        </div>
                        
                        <p id="threadContain">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil tempora possimus harum recusandae, 
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil tempora possimus harum recusandae</p>
                    </div>
                    
                    <div class="threadComments">
                        <Comment />
                        <Comment />
                    </div>
                    
                    <div class="comment">
                        <input id="commentBox" placeholder="Enter a comment"></input>
                    </div>
                </div>
                <span className="exitButton" onClick={this.props.toggleModal}></span>
            </div>
        )
    }
}

export default ThreadCardModal