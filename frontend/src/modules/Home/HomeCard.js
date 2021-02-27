import React, { Component } from 'react'
import Image from '../../Es3UYDXXIAMYXiQ.jpeg'

export default class HomeCard extends Component {
    render() {
        return (
            <div className="itemCard">
                <div className="itemImage" style={{backgroundImage: `url(${Image})`}}></div>
                <div className="itemNamePrice">
                    <h2 className="cardTitle">{this.props.cardTitle}</h2>
                    <h2>{`$${this.props.cardPrice}`}</h2>
                </div>
                <div className="userInfo">
                    <div className="profilePictureCard"></div>
                    <h3>{this.props.sellerName}</h3>
                </div>
            </div>
        )
    }
}
