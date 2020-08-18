(function(){
    $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
    });
})();

let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name: 'Garden Vase',
        tag: 'vase garden',
        price: 25,
        inCart: 0
    },
    {
        name: 'Harvest Vase',
        tag: 'vase harvest',
        price: 78,
        inCart: 0
    }
]


for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        console.log('add cart');
        cartNumbers();
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
function cartNumbers() {
    // get item local storage
    let productNumbers = localStorage.getItem('cartNumbers');
    console.log(productNumbers);
    console.log(typeof productNumbers); //string value type for local storage
    
    // convert to integer
    productNumbers = parseInt(productNumbers);
    console.log(typeof productNumbers); //number value type for local storage

    //condition for NaN productNumbers
    if (productNumbers) {
        // set item to local storage
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

}

// on load page
onLoadCartNumbers();