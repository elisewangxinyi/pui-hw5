import React, { Component } from 'react';
import "./Item.css";


class ItemNew extends Component {
    render(){
        const sizeOne = 1;
        const sizeThree = 3;
        const sizeSix = 5;
        const sizeTwelve = 10;

        return(
            <div className="product">
                <div className="thumbnail-pic">
                    <img src={this.props.bun.imageURL} alt={this.props.bun.altText}/>
                </div>

                <h2 className="product-name">{this.props.bun.bunName}</h2>

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
                    <button className={this.props.bun.packSize == sizeOne ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeOne}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>1</button>
                    <button className={this.props.bun.packSize == sizeThree ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeThree}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>3</button>
                    <button className={this.props.bun.packSize == sizeSix ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeSix}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>6</button>
                    <button className={this.props.bun.packSize == sizeTwelve ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeTwelve}
                            onClick={(event) => this.props.onSizeChange(this.props.bunIndex, event)}>12</button>
                </div>

                <div className="add-to-cart">
                    
                    <h2 className="item-price">{`$${this.props.bun.price}`}</h2>
                    <button className="btn-addCart" 
                            onClick={() => this.props.onAddCart(this.props.bunIndex)}>
                            Add to Cart
                    </button>
                </div>
            </div>
        );
    }
}

export default ItemNew;