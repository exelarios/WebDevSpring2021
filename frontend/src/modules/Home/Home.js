import React, { Component } from 'react'
import './Home.css';
import HomeCard from './HomeCard';
import HomeCardModal from './HomeCardModal';

class Home extends Component {
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
        <HomeCardModal toggleModal={this.toggleModal} modalActive={this.state.modalActive}/>
        <div className="container" id="homePage" style={{display: (this.props.homeActive) ? 'flex' : 'none'}}>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
          <HomeCard toggleModal={this.toggleModal}/>
        </div>
      </>
    )
  }
}

export default Home