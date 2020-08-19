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
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
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

    //condition for NaN productNumbers
    if (productNumbers) {
        // set item to local storage
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
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
    } else {     
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productInCart', JSON.stringify(cartItems));
}

// function total cost
function totalCost(product) {
    // console.log('price product is', product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

// fucntion display cart
function displayCart() {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);

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
                                <button class="btns btn-default bootstrap-touchspin-down" type="button">-</button>
                            </span>
                            <span class="input-group-addon bootstrap-touchspin-prefix" style="display: none;">
                            </span>
                            <input type="text" name="" value="${item.inCart}" class="input-qty form-control text-center" style="display: block;">
                            <span class="input-group-addon bootstrap-touchspin-postfix" style="display: none;">
                            </span>
                            <span class="input-group-btn">
                                <button class="btns btn-default bootstrap-touchspin-up" type="button">+</button>
                            </span>
                        </div>
                    </td>
                    <td>$ ${item.price}</td>
                    <td>100</td> 
                </tr"> 
            `
        })
    }
} 

// on load page
onLoadCartNumbers();
displayCart();