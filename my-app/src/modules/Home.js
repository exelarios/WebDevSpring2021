import React, { Component } from 'react'
import Logo from '../cpp-octo-web.svg'
import UploadModal from './UploadModal';

class Home extends Component {
    constructor(props) {
        super(props)
        this.modalRef = React.createRef();
        this.state = {
            heading: '',
            itemModal: false,
            questionModal: false,
        }
    }

    EnterModal = () => {
        const { display } = this.modalRef.current.modalScreen.current.style;
        if(display === 'flex')  {
            this.modalRef.current.modalScreen.current.style.display = 'none';
        } else {
            this.modalRef.current.modalScreen.current.style.display = 'flex';
        }
    }

    EnterItemModal = () => {
        this.EnterModal();
        this.setState({
            heading: 'Upload Item',
            itemModal: true,
            questionModal: false
        })
    }

    EnterQuestionModal = () => {
        this.EnterModal();
        this.setState({
            heading: 'Ask a Question',
            itemModal: false,
            questionModal: true
        })
    }

    render() {
        console.log(this.modalRef);
        return (
            <div id="blogPage">
                <UploadModal ref={this.modalRef} heading={this.state.heading} itemModal={this.state.itemModal} questionModal={this.state.questionModal}></UploadModal>
                <img src={Logo} id="mainLogo"></img>
                <button onClick={this.EnterItemModal} className="uploadItem">Upload</button>
                <button onClick={this.EnterQuestionModal} className="uploadItem">Upload Question</button>
            </div>
        )
    }
}

export default Home;
