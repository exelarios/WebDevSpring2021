import React, { Component } from 'react'

export default class HomeCard extends Component {
    render() {
        return (
            <div className="itemCard">
                <div className="itemImage" style={{backgroundImage: `url(${this.props.image[0]})`}}></div>
                <div className="itemNamePrice">
                    <h2 className="cardTitle">{this.props.cardTitle}</h2>
                    <h2>{`$${this.props.cardPrice}`}</h2>
                </div>
                <div className="userInfo">
                    <div className="profilePictureCard" style={{backgroundImage: `url(${this.props.sellerPhoto})`}}></div>
                    <h3>{this.props.sellerName}</h3>
                </div>
            </div>
        )
    }
}
