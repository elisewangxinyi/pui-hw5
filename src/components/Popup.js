import React, { Component } from 'react';
import './Popup.css';


class Popup extends Component {
    render() {
        return (
            <div id="cartPopup">
                <p className="popup-summary">Added to cart:</p>
                <p id="popup-name" className="popup-summary">
                    {this.props.addedItem.bunName}
                </p>
                <p className="popup-summary">
                    {this.props.addedItem.glazing} glazing
                </p>
                <p className="popup-summary">
                    Pack of {this.props.addedItem.packSize}
                </p>
                <p className="popup-summary">
                    Price: ${this.props.addedItem.price}
                </p>
            </div>
        );
    }
}

export default Popup;