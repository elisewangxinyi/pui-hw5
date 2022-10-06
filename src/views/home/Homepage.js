import React, { Component } from 'react';
import './Homepage.css';
import Item from '../../components/Item';
import Navbar from '../../components/Navbar';
import Popup from '../../components/Popup';
import CartItem from '../../components/CartItem';

class Roll {
    glazingToPrice = {
        "Keep original": 0,
        "Sugar milk": 0,
        "Vanilla milk": 0.5,
        "Double chocolate": 1.5
    }

    sizeToDisplaySize = {
        1: 1,
        3: 3,
        5: 6,
        10: 12
    };
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
            popUpSeen: false,
            searchKey: null,
            showCart: false
        };

        this.input = '';
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

    handleSearchChange = (event) => {
        const newKey = event.target.value;
        this.input = newKey;
    }

    handleSearchBtn = () => {
        this.setState (prevState => ({
            ...prevState,
            searchKey: this.input
        }))
    }

    handleSorting = (event) => {
        const sortKey = event.target.value;
        let newItemData = this.state.itemData.slice();
        
        if (sortKey === 'name'){
            newItemData.sort((a, b) => 
                a.bunName > b.bunName ? 1 : -1)
        } else {
            newItemData.sort((a, b) => 
                a.basePrice - b.basePrice)
        }
       
        this.setState(prevState => ({
            ...prevState,
            itemData: [...newItemData]
        }))

    }

    handleShowCart = () => {
        this.setState(prevState => ({
            ...prevState,
            showCart: !this.state.showCart
        }))
    }

    handleRemoveFromCart = (itemToRemove) => {
        console.log('here in remove')
        console.log(itemToRemove)
        const index = this.state.cart.indexOf(itemToRemove);
        let newCart = this.state.cart;
        if (index > -1) {
            newCart.splice(index, 1); 
        }

        this.setState(prevState => ({
            ...prevState,
            cart: newCart,
            totalItem: newCart.length,
            totalPrice: this.calcTotalPrice(newCart)
        }))
    }

    render(){
        let cartEmpty = this.state.cart.length === 0;
        let hasProduct = 0;
        return (
            <div className="Homepage">
                <header>
                    <div id='header-logo'>
                        <img src={process.env.PUBLIC_URL + "/assets/logo-01.svg"} 
                             alt="Logo of Bun Bun Bake Shop"/>
                    </div>
                    
                    <div id="header-content">
                        <Navbar 
                        toggleCart = {this.handleShowCart}
                        />
                        {/*EXAMPLE from: https://medium.com/@daniela.sandoval/creating-a-popup-window-using-js-and-react-4c4bd125da57*/ }
                        {this.state.popUpSeen ? <Popup addedItem={this.state.cart.at(-1)}/> : null}
                        <hr />
                        <h1>Our hand-made cinnamon rolls</h1>
                    </div>
                </header>
                
                {this.state.showCart &&
                    <div id='cart'>
                        {/* <hr/> */}
                        <div className='cart-info'>
                            <p>Shopping Cart {this.state.totalItem} items</p>
                            <p>Total: ${this.state.totalPrice}</p>
                        </div>
                        
                        {cartEmpty && <div>The cart is empty!</div>}
                        {!cartEmpty && 
                            <div className='cart-content'>
                                {this.state.cart.map((addedBun, idx) => {
                                    return <CartItem
                                            key={idx}
                                            item = {addedBun}
                                            onRemove = {this.handleRemoveFromCart}/>
                                })}
                            </div>
                        }
                        {/* <hr/> */}
                    </div>
                }

                <div id='search-sort'>
                    <div id='search'>
                        <input type="text" onChange={this.handleSearchChange}></input>
                        <button onClick={this.handleSearchBtn}>Search</button>
                    </div>

                    <div id='sort'>
                        <label>sort by:</label>
                        <select onChange={(event) => this.handleSorting(event)}>
                            <option value=''>Please select</option>
                            <option value='name'>Name</option>
                            <option value='basePrice'>Base Price</option>
                        </select>
                    </div>
                    
                </div>

                <div id='product-list'>
                    {this.state.itemData.map((bunObject, idx) => {
                        if (this.state.searchKey === null || bunObject.bunName.includes(this.state.searchKey)){
                            hasProduct ++;
                            const result = <Item
                                        key={idx} 
                                        bunIndex={idx} 
                                        bun = {bunObject}
                                        onGlazingChange = {this.handleGlazingChange}
                                        onSizeChange = {this.handleSizeChange}
                                        onAddCart = {this.handleAddToCart}/>
                            return result
                        } 
                        else {
                            return <div key={idx}/>
                        }}
                    )
                    }
                </div>
                {hasProduct === 0 &&
                        <div id='no-result'>No match!</div>
                }
            </div>
        );
    }
}

export default Homepage;