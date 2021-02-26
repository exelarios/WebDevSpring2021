import React, { Component } from 'react'
import Image from '../../Es3UYDXXIAMYXiQ.jpeg'

export default class HomeCard extends Component {
    render() {
        return (
            <div className="itemCard" onClick={this.props.toggleModal}>
                <div className="itemImage" style={{backgroundImage: `url(${Image})`}}></div>
                <div className="itemNamePrice">
                    <h2 className="cardTitle">Placeholder Object</h2>
                    <h2>$200.00</h2>
                </div>
                <div className="userInfo">
                    <div className="profilePictureCard"></div>
                    <h3>John Doe</h3>
                </div>
            </div>
        )
    }
}
