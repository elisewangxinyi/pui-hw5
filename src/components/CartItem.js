import React, { Component } from 'react';
import "./CartItem.css"


class CartItem extends Component {
    render(){
        return(
            <div className='cartItem'>
                <img src={this.props.item.imageURL}
                    alt={this.props.item.altText}/>
                
                <div>{this.props.item.bunName}</div>
                <div>Glazing: {this.props.item.glazing}</div>
                <div>Pack Size: {this.props.item.sizeToDisplaySize[this.props.item.packSize]}</div>
                <div className='price'>$ {this.props.item.price}</div>
                <button >Remove</button>
            </div>
        )
        
    }
}

export default CartItem;