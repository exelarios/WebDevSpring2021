import React, { Component } from 'react'
import './Blog.css';
import ThreadCard from './ThreadCard';
import ThreadCardModal from './ThreadCardModal';



class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalActive: false
    }
  }

  toggleModal = () => {
    let changeState = (this.state.modalActive) ? false : true;
    this.setState({
      modalActive: changeState
    })
  }

  render() {
    return (
      <>
        <ThreadCardModal toggleModal={this.toggleModal} modalActive={this.state.modalActive} />

        <div className="container" id="blogPage">
          <ThreadCard toggleModal={this.toggleModal} title="Thread title 1" author="John Doe" topic="Electronics"/>
          <ThreadCard toggleModal={this.toggleModal} title="Thread title 2" author="John Doe" topic="Others"/>
          <ThreadCard toggleModal={this.toggleModal} title="Thread title 3" author="John Doe" topic="Housing"/>
          <ThreadCard toggleModal={this.toggleModal} title="Thread title 4" author="John Doe" topic="Classes"/>
        </div>
      </>
    )
  }
}

export default Blog