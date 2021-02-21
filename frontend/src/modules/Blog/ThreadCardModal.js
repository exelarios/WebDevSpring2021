import React, { Component } from 'react'


class ThreadCardModal extends Component {
    render() {
        return (
            <div className="modalScreen" style={{display: (this.props.modalActive) ? 'flex' : 'none' }}>
                <div className="modal mainModal">
                    
                </div>
                <span className="exitButton" onClick={this.props.toggleModal}></span>
            </div>
        )
    }
}

export default ThreadCardModal