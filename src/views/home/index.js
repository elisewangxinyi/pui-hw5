import React, { Component } from 'react';
import './Homepage.css';
import Item from '../../components/Item';
import Navbar from '../../components/Navbar';
import Popup from '../../components/Popup';

class Roll {
    glazingToPrice = {
        "Keep original": 0,
        "Sugar milk": 0,
        "Vanilla milk": 0.5,
        "Double chocolate": 1.5
    }
    constructor(imageURL, bunName, altText, basePrice){
        this.imageURL = imageURL;
        this.bunName = bunName;
        this.altText = altText;
        this.basePrice = basePrice;
        this.glazing = "Keep original";
        this.packSize = 1;
        this.price = basePrice
    }

    glazingChange = (event) => {
        const glazingSelected = event.target;
        const glazingName = glazingSelected.options[glazingSelected.selectedIndex].text;

        this.glazing = glazingName;
        this.updatePrice();
    }

    sizeChange = (event) => {
        this.packSize = event.target.value;
        this.updatePrice();
    }

    updatePrice = () => {
        const price = this.packSize * (this.glazingToPrice[this.glazing] + this.basePrice);
        this.price = price.toFixed(2);
    }

    addToList = (list) => {
        list.push(this);
    }

}

class Homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemData: [
            new Roll(process.env.PUBLIC_URL + "/assets/original-cinnamon-roll.jpg",
                     "Original cinnamon roll", 
                     "original cinnamon roll on a plate",
                     2.49),
            new Roll(process.env.PUBLIC_URL + "/assets/apple-cinnamon-roll.jpg",
                     "Apple cinnamon roll",
                     "apple cinnamon roll with a fork",
                     3.49),
            new Roll(process.env.PUBLIC_URL + "/assets/raisin-cinnamon-roll.jpg",
                     "Raisin cinnamon roll",
                     "raisin cinnamon roll",
                     2.99),
            new Roll(process.env.PUBLIC_URL + "/assets/walnut-cinnamon-roll.jpg",
                     "Walnut cinnamon roll",
                     "a walnut cinnamon roll with a fork",
                     3.49),
            new Roll(process.env.PUBLIC_URL + "/assets/double-chocolate-cinnamon-roll.jpg",
                     "Double-chocolate cinnamon roll",
                     "a double chocolate cinnamon roll in a wrapper",
                     3.99),
            new Roll( process.env.PUBLIC_URL + "/assets/strawberry-cinnamon-roll.jpg",
                     "Strawberry cinnamon roll",
                     "multiple strawberry cinnamon rolls",
                     3.99)
            ],

            cart: [],
            totalItem: 0,
            totalPrice: 0,
            popUpSeen: false
        }
    }

    calcTotalPrice = (itemList) => {
        let price = 0;
        for (const item of itemList){
            price += Number(item.price);
        }
        return price.toFixed(2);
    }

    handleGlazingChange = (index,event) => {
        let newItemData = this.state.itemData;
        newItemData[index].glazingChange(event);

        this.setState({ itemData: [ ...newItemData ]})
    }

    handleSizeChange = (index,event) => {
        let newItemData = this.state.itemData;
        newItemData[index].sizeChange(event);

        this.setState({ itemData: [ ...newItemData ]})
    }

    handleAddToCart = (index) => {
        this.handlePopUp();
        let newCart = this.state.cart;
        this.state.itemData[index].addToList(newCart);
        this.setState(prevState => ({
            ...prevState,
            cart: newCart,
            totalItem: newCart.length,
            totalPrice: this.calcTotalPrice(newCart)
        }))
    }

    handlePopUp = () => {
        this.setState (prevState => ({
            ...prevState,
            popUpSeen: true
        }))
        setTimeout(this.closePopup, 3000);
    }

    closePopup = () => {
        this.setState (prevState => ({
            ...prevState,
            popUpSeen: false
        }))
    }

    render(){
        return (
            <div className="Homepage">
                <header>
                    <div id='header-logo'>
                        <img src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} 
                             alt="Logo of Bun Bun Bake Shop"/>
                    </div>
                    
                    <div id="header-content">
                        <Navbar 
                        totalItem = {this.state.totalItem}
                        totalPrice={this.state.totalPrice}
                        />
                        {/*EXAMPLE from: https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57*/ }
                        {this.state.popUpSeen ? <Popup addedItem={this.state.cart.at(-1)}/> : null}
                        <hr className="divider"/>
                        <h1>Our hand-made cinnamon rolls</h1>
                    </div>
                </header>

                <div id='product-list'>
                    <Item
                        bunIndex = {0}
                        imageURL ={this.state.itemData[0].imageURL}
                        bunName = {this.state.itemData[0].bunName}
                        altText = {this.state.itemData[0].altText}
                        price = {this.state.itemData[0].price}
                        onGlazingChange = {this.handleGlazingChange}
                        onSizeChange = {this.handleSizeChange}
                        onAddCart = {this.handleAddToCart}/>
                    <Item
                        bunIndex = {1}
                        imageURL ={this.state.itemData[1].imageURL}
                        bunName = {this.state.itemData[1].bunName}
                        altText = {this.state.itemData[1].altText}
                        price = {this.state.itemData[1].price}
                        onGlazingChange = {this.handleGlazingChange}
                        onSizeChange = {this.handleSizeChange}
                        onAddCart = {this.handleAddToCart}/>
                    <Item
                        bunIndex = {2}
                        imageURL ={this.state.itemData[2].imageURL}
                        bunName = {this.state.itemData[2].bunName}
                        altText = {this.state.itemData[2].altText}
                        price = {this.state.itemData[2].price}
                        onGlazingChange = {this.handleGlazingChange}
                        onSizeChange = {this.handleSizeChange}
                        onAddCart = {this.handleAddToCart}/>
                    <Item
                        bunIndex = {3}
                        imageURL ={this.state.itemData[3].imageURL}
                        bunName = {this.state.itemData[3].bunName}
                        altText = {this.state.itemData[3].altText}
                        price = {this.state.itemData[3].price}
                        onGlazingChange = {this.handleGlazingChange}
                        onSizeChange = {this.handleSizeChange}
                        onAddCart = {this.handleAddToCart}/>
                    <Item
                        bunIndex = {4}
                        imageURL ={this.state.itemData[4].imageURL}
                        bunName = {this.state.itemData[4].bunName}
                        altText = {this.state.itemData[4].altText}
                        price = {this.state.itemData[4].price}
                        onGlazingChange = {this.handleGlazingChange}
                        onSizeChange = {this.handleSizeChange}
                        onAddCart = {this.handleAddToCart}/>
                    <Item
                        bunIndex = {5}
                        imageURL ={this.state.itemData[5].imageURL}
                        bunName = {this.state.itemData[5].bunName}
                        altText = {this.state.itemData[5].altText}
                        price = {this.state.itemData[5].price}
                        onGlazingChange = {this.handleGlazingChange}
                        onSizeChange = {this.handleSizeChange}
                        onAddCart = {this.handleAddToCart}/>
                </div>
            </div>
        );
    }
}

export default Homepage;