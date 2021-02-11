import React, { Component } from 'react'
import FilterBox from './FilterBox'
import UploadModal from './UploadModal';
import './RightSide.css'

class RightSide extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef();
        this.state = {
            heading: '',
            itemModal: false,
            questionModal: false,
        }
    }

    ToggleModal = () => {
        const { display } = this.modalRef.current.modalScreen.current.style;
        if(display === 'flex')  {
            this.modalRef.current.modalScreen.current.style.display = 'none';
        } else {
            this.modalRef.current.modalScreen.current.style.display = 'flex';
        }
    }

    EnterItemModal = () => {
        this.ToggleModal();
        this.setState({
            heading: 'Upload Item',
            itemModal: true,
            questionModal: false
        })
    }

    EnterQuestionModal = () => {
        this.ToggleModal();
        this.setState({
            heading: 'Ask a Question',
            itemModal: false,
            questionModal: true
        })
    }

    render() {
        return (
            <>
                <UploadModal ref={this.modalRef} heading={this.state.heading} itemModal={this.state.itemModal} questionModal={this.state.questionModal} ToggleModal={this.ToggleModal}></UploadModal>
                <div class="rightside">
                    <div>
                        <FilterBox />
                    </div>
                    <button id="homeUpload" onClick={this.EnterItemModal} className="uploadItem siteButton">Upload</button>
                    <div id="userInfo">
                        <p>Account:</p>
                        <p>[nickname]</p>
                    </div>
                </div>
            </>
          )
    }
  }

export default RightSide