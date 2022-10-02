import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {
    render() {
        return (
            <div id='navbar'>
                <nav>
                    <div className="navigation">
                        <a href="gallery.html">PRODUCTS</a>
                    </div>
                
                    <div className="navigation">
                        <a href="cart.html">CART</a>
                    </div>
                </nav>
                <p className="cart-content">{this.props.totalItem} items</p>
                <p className="cart-content">Total: ${this.props.totalPrice}</p>
            </div>
        );
    }
}

export default Navbar;