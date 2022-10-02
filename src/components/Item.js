import React, { Component } from 'react';
import "./Item.css";


class Item extends Component {
    render(){
        return(
            <div className="product">
                <div className="thumbnail-pic">
                    <img src={this.props.imageURL} alt={this.props.altText}/>
                </div>

                <h2 className="product-name">{this.props.bunName}</h2>

                <div className="glazing">
                    <label>Glazing:</label>
                
                    <select className="glazing-select" onChange={(event) => this.props.onGlazingChange(this.props.bunIndex, event)}>
                        <option value={0}>Keep original</option>
                        <option value={0}>Sugar milk</option>
                        <option value={0.5}>Vanilla milk</option>
                        <option value={1.5}>Double chocolate</option>
                    </select>
                </div>

                <div className="pack-size">
                    <label>Pack size:</label>
                    <button className="btn-pack-size" value={1}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>1</button>
                    <button className="btn-pack-size" value={3}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>3</button>
                    <button className="btn-pack-size" value={5}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>6</button>
                    <button className="btn-pack-size" value={10}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>12</button>
                </div>

                <div className="add-to-cart">
                    
                    <h2 className="item-price">{`$${this.props.price}`}</h2>
                    <button className="btn-addCart" 
                            onClick={() => this.props.onAddCart(this.props.bunIndex)}>
                            Add to Cart
                    </button>
                </div>
            </div>
        );
    }
}

export default Item;