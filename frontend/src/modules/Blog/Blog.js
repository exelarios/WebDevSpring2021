import React, { Component } from 'react'
import './Blog.css';
import ThreadCard from './ThreadCard';



class Blog extends Component {
  render() {
    return (
      <div class="container" id="blogPage" style={{display: (this.props.blogActive) ? 'flex' : 'none'}}>
        <ThreadCard title="Thread title 1" author="John Doe" topic="Electronics"/>
        <ThreadCard title="Thread title 2" author="John Doe" topic="Others"/>
        <ThreadCard title="Thread title 3" author="John Doe" topic="Housing"/>
        <ThreadCard title="Thread title 4" author="John Doe" topic="Classes"/>
      </div>
    )
  }
}

export default Blog