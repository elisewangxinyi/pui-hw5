import React, { Component } from 'react';
import "./Item.css";


class Item extends Component {
    constructor(props){
        super(props);
        this.item = props.bun;
        // console.log(this.item)
        console.log("constructor")
        this.state = {
            imageURL: this.item.imageURL,
            bunName: this.item.bunName,
            altText: this.item.altText,
            price: this.item.price,
            glazing: this.item.glazing,
            packSize: this.item.packSize
        };
    }

    componentDidMount = () => {
        console.log("component did mount")
    }
    componentDidUpdate = () => {
        console.log("component did update")
    }

    handleGlazingChange = (event) => {
        this.item.glazingChange(event);

        event.target.className += ' selected';

        this.setState(prevState => ({
            ...prevState,
            glazing: this.item.glazing,
            price: this.item.price
        }))
    }

    handleSizeChange = (event) => {
        this.item.sizeChange(event);

        this.setState(prevState => ({
            ...prevState,
            packSize: this.item.packSize,
            price: this.item.price,
        }))
    }

    render(){
        const sizeOne = 1;
        const sizeThree = 3;
        const sizeSix = 5;
        const sizeTwelve = 10;

        return(
            <div className="product">
                <div className="thumbnail-pic">
                    <img src={this.state.imageURL} alt={this.state.altText}/>
                </div>

                <h2 className="product-name">{this.state.bunName}</h2>

                <div className="glazing">
                    <label>Glazing:</label>
                
                    <select className="glazing-select" onChange={(event) => this.handleGlazingChange(event)}>
                        <option value={0}>Keep original</option>
                        <option value={0}>Sugar milk</option>
                        <option value={0.5}>Vanilla milk</option>
                        <option value={1.5}>Double chocolate</option>
                    </select>
                </div>

                <div className="pack-size">
                    <label>Pack size:</label>
                    <button className={this.state.packSize == sizeOne ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeOne}
                            onClick={(event) => this.handleSizeChange(event)}>1</button>
                    <button className={this.state.packSize == sizeThree ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeThree}
                            onClick={(event) => this.handleSizeChange(event)}>3</button>
                    <button className={this.state.packSize == sizeSix ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeSix}
                            onClick={(event) => this.handleSizeChange(event)}>6</button>
                    <button className={this.state.packSize == sizeTwelve ? "sizeBtn-click" : "sizeBtn-normal"} 
                            value={sizeTwelve}
                            onClick={(event) => this.handleSizeChange(event)}>12</button>
                </div>

                <div className="add-to-cart">
                    
                    <h2 className="item-price">{`$${this.state.price}`}</h2>
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