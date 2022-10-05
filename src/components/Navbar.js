import React, { Component } from 'react';
import './Navbar.css';


class Navbar extends Component {
    render() {
        return (
            <div id='navbar'>
                <nav>
                    <div className="navigation">
                        PRODUCTS
                    </div>
                
                    <div className="navigation" onClick={this.props.toggleCart}>
                        CART
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;