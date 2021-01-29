import React, { Component } from 'react'
import UploadItem from './UploadItem'
import UploadQuestion from './UploadQuestion';

class UploadModal extends Component {
    constructor(props) {
        super(props);
        this.modalScreen = React.createRef();
        this.itemModal = React.createRef();
        this.questionModal = React.createRef();
        this.state = { 
        }
    }

    render() {
        return (
            <div ref={this.modalScreen} id="modalScreen">
                <div id="modal">
                    <div id="modalHeader">
                        <h2>{this.props.heading}</h2>
                    </div>
                    <div id="modalBody">
                        <UploadItem itemModal={this.props.itemModal}></UploadItem>
                        <UploadQuestion questionModal={this.props.questionModal}></UploadQuestion>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default UploadModal