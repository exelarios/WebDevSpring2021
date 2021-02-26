import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Blog.css';
import ThreadCard from './ThreadCard';
import ThreadCardModal from './ThreadCardModal';



function Blog() {

  return (
    <>
      <ThreadCardModal toggleModal={this.toggleModal} modalActive={this.state.modalActive} />
      <div class="container" id="blogPage" style={{ display: (this.props.blogActive) ? 'flex' : 'none' }}>
        <ThreadCard toggleModal={this.toggleModal} title="Thread title 1" author="John Doe" topic="Electronics"/>
        <ThreadCard toggleModal={this.toggleModal} title="Thread title 2" author="John Doe" topic="Others"/>
        <ThreadCard toggleModal={this.toggleModal} title="Thread title 3" author="John Doe" topic="Housing"/>
        <ThreadCard toggleModal={this.toggleModal} title="Thread title 4" author="John Doe" topic="Classes"/>
      </div>
    </>
  )
  
}

export default Blog