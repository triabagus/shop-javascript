(function(){
    $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
    });
})();

let carts = document.querySelectorAll('.add-cart');
let products = [
    { 
        name: 'Garden Vase',
        tag: 'vaseGarden',
        price: 25,
        inCart: 0
    },
    { 
        name: 'Harvest Vase',
        tag: 'vaseHarvest',
        price: 78,
        inCart: 0
    }
]


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        // console.log('add cart');
        cartNumbers(products[i]);
        totalCost(products[i]); 
    });
}

// onLoadCartNumbers from Local Storage 
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    let totalCost = localStorage.getItem('totalCost');
    let cartProductNumber = document.querySelector('.cart span');
    let badgeProductNumber = document.querySelector('.shopping-cart-header .badge');
    let dollarSpan = document.querySelector('.dollar');

    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    let shoppingCartItems = document.querySelector('.shopping-cart-items');


    if (productNumbers || totalCost || cartItems) {
        cartProductNumber.textContent = productNumbers;
        badgeProductNumber.textContent = productNumbers;
        dollarSpan.textContent = '$';
        dollarSpan.textContent += totalCost;

        shoppingCartItems.innerHTML = ``; 
        Object.values(cartItems).map(item => {
            shoppingCartItems.innerHTML += ` 
            <li class="clearfix">
                <img src="./images/${item.tag}.png" alt="${item.tag}" />
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price}</span>
                <span class="item-quantity">Quantity: ${item.inCart}</span>
            </li> 
            `
        });
    }
}

// Cart number to local storage
function cartNumbers(product) {
    // console.log('product click is', product);
    // get item local storage
    let productNumbers = localStorage.getItem('cartNumbers'); 
    // console.log(productNumbers);
    // console.log(typeof productNumbers); //string value type for local storage
    
    // convert to integer
    productNumbers = parseInt(productNumbers); 
    // console.log(typeof productNumbers); //number value type for local storage
    let cartProductNumber = document.querySelector('.cart span');
    let badgeProductNumber = document.querySelector('.shopping-cart-header .badge');

    //condition for NaN productNumbers
    if (productNumbers) {
        // set item to local storage
        localStorage.setItem('cartNumbers', productNumbers + 1);
        cartProductNumber.textContent = productNumbers + 1;
        badgeProductNumber.textContent = productNumbers + 1; 
    } else {
        localStorage.setItem('cartNumbers', 1);
        cartProductNumber.textContent = 1;
        badgeProductNumber.textContent = 1; 
    }

    //set item product from local storage
    setItems(product);
}

// set item product function
function setItems(product) {
    // console.log('Inside of setItems function');
    // console.log('My product is', product);
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    let shoppingCartItems = document.querySelector('.shopping-cart-items');

    // condition for inCart count local storage product
    if (cartItems != null) {
        // condition for cart product tag undefined on local storage
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems, // cart items loop
                [product.tag] :product
            }
        }
        cartItems[product.tag].inCart += 1;

        shoppingCartItems.innerHTML = ``; 
        Object.values(cartItems).map(item => {
            shoppingCartItems.innerHTML += ` 
            <li class="clearfix">
                <img src="./images/${item.tag}.png" alt="${item.tag}" />
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price}</span>
                <span class="item-quantity">Quantity: ${item.inCart}</span>
            </li> 
            `
        });
    } else {     
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        } 
        
        shoppingCartItems.innerHTML = ``; 
        Object.values(cartItems).map(item => {
            shoppingCartItems.innerHTML += ` 
            <li class="clearfix">
                <img src="./images/${item.tag}.png" alt="${item.tag}" />
                <span class="item-name">${item.name}</span>
                <span class="item-price">$${item.price}</span>
                <span class="item-quantity">Quantity: ${item.inCart}</span>
            </li> 
            `
        });  
    }

    localStorage.setItem('productInCart', JSON.stringify(cartItems));
}

// function total cost
function totalCost(product) {
    // console.log('price product is', product.price);
    let cartCost = localStorage.getItem('totalCost');
    let dollarSpan = document.querySelector('.dollar');
    
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price); 
        dollarSpan.textContent = '$';
        dollarSpan.textContent += cartCost + product.price;
    } else {
        localStorage.setItem('totalCost', product.price); 
        dollarSpan.textContent = '$';
        dollarSpan.textContent += product.price;
    }
}

// fucntion display cart
function displayCart() {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    let productContainer = document.querySelector('.product-container');
    if (cartItems && productContainer) {
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += ` 
                <tr">
                    <td>
                        <ion-icon name="trash"> </ion-icon>
                    </td>
                    <td>
                        <img src="images/${item.tag}.png" alt="${item.tag}" title="" width="45" height="45"> 
                    </td>
                    <td>${item.name}</td>
                    <td>
                        <div class="input-group bootstrap-touchspin">
                            <span class="input-group-btn">
                                <button class="btns btn-default bootstrap-touchspin-down " type="button" onclick="decrement('${item.tag}')">-</button>
                            </span>
                            <span class="input-group-addon bootstrap-touchspin-prefix" style="display: none;">
                            </span>
                            <input id="${item.tag}" type="text" name="qty" value="${item.inCart}" class="input-qty form-control text-center" style="display: block;">
                            <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;">
                            </span>
                            <span class="input-group-btn">
                                <button class="btns btn-default bootstrap-touchspin-up" type="button" onclick="increment('${item.tag}')">+</button>
                            </span>
                        </div>
                    </td>
                    <td>$ ${item.price},00</td>
                    <td>$ ${item.price * item.inCart},00</td> 
                </tr"> 
            `
        })

        productContainer.innerHTML += `
        <tr>
            <td colspan="5"></td>
            <td colspan="1"> Tax : <span>0</span></td>
        </tr>
        <tr>
            <td colspan="5" ></td>
            <td colspan="1"> Diskon : <span>0%</span></td>
        </tr>
        <tr>
            <td colspan="5" ></td>
            <td colspan="1"> Total : <span>$ ${cartCost},00</span></td>
        </tr>
        <tr>
            <td colspan="4"></td>
            <td colspan="2">
                <a href="checkout.html" class="btn btn-checkout">
                    Checkout
                </a>
            </td> 
        </tr>
        `
    } 
}

// increment
function increment(product) { 
    // console.log('increment', product);
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems); 
    let input = document.getElementById(product); 
    console.log(input);
    cartItems[product].inCart += 1; 
    localStorage.setItem('productInCart', JSON.stringify(cartItems)); 
}
 

// decrement
function decrement(product) { 
    // console.log('decrement', product);
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems); 
    let input = document.getElementById(product); 
    console.log(input);

    cartItems[product].inCart -= 1;
    localStorage.setItem('productInCart', JSON.stringify(cartItems)); 
}
 

// on load page
onLoadCartNumbers();
displayCart();