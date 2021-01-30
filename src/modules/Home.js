import React, { Component } from 'react'
import SideNav from './SideNav'
import Main from './Main'
import RightSide from './RightSide'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        return (
            <div id="blogPage">
                <SideNav />
                <Main />
                <RightSide />        
            </div>
        )
    }
}

export default Home;
