import { getProduct } from "./services/products.js";

// Events
window.addEventListener('load', () => { init(); })

// Variables
var SelectedThumbnail = null;
var SelectedSize = null;
var quantity = null;
var buyBtn = document.getElementById("button-buy");
const ratingStars = [...document.getElementsByClassName("rating_star")];
const ratingResult = document.querySelector(".rating_result");

// Init
function init() {
    console.log('Initializing document...');
    loadProduct('1001');
}

// Load products
function loadProduct(id) {
    console.log('Getting product ' + id + '...');
    getProduct(id).then((response) => {
        if (response.status == 0)
            showProduct(response.product);
        else
            errorHandler(response.errorHandler);
    });
}

// Show product
function showProduct(product) {
    console.log(product);

    // Show photo
    if (product.styles.length > 0)
        document.getElementById('product').src = product.styles[0].photo;

    // Add thumbnails
    product.styles.forEach(s => {
        var img = document.createElement('img');
        img.src = s.photo;
        img.id = 'thumbnail-' + s.sku;
        document.getElementById('thumbnails').appendChild(img);
        //event
        document.getElementById(img.id).addEventListener('click', () => {
            changePhoto(s);
        })
    });

    // Change size
    product.sizes.forEach(s => {
        var label = document.createElement('label');
        label.textContent = s.size;
        label.id = 'size-' + s.sku;
        document.getElementById('sizes').appendChild(label);
        //event
        document.getElementById(label.id).addEventListener('click', () => {
            changeSize(s);
        })
    });

    // Decrement quantity event
    document.getElementById("dec").addEventListener('click', () => {
        decrementQuantity();
    });
    // Increment quantity event
    document.getElementById("inc").addEventListener('click', () => {
        incrementQuantity();
    });

    //show model
    showModel(product);
    //show price
    showPriceLabel(product);
    // stars rating
    executeRating(ratingStars, ratingResult);
    // changing the stars rating
    printRatingResult(ratingResult);
    // log buy button
    buy(buyBtn);
}

function showModel(product){
    document.getElementById('model').src = product.brand.name;
    var name = document.createElement('h1');
    name.innerHTML = product.brand.name;
    console.log("Product model: " + name.textContent);
    document.getElementById('model').appendChild(name);
}

function changePhoto(style) {
    // Main image 
    console.log(style);
    document.getElementById('product').src = style.photo;

    // Set a border for the selected thumbnail
    if (SelectedThumbnail != null)
        document.getElementById('thumbnail-' + SelectedThumbnail).style.borderColor = "#f1f1f1";
        document.getElementById('thumbnail-' + style.sku).style.borderColor = '#689f38';
        SelectedThumbnail = style.sku;
}

function showPriceLabel(product){
    document.getElementById('price').src = product.price;
    var priceLabel = document.createElement('h2');
    priceLabel.innerHTML = "$" + product.price;
    document.getElementById('price').appendChild(priceLabel);
}

// Change size function
function changeSize(size){
    // log the selected size
    console.log(size);
    document.getElementById('sizes').src = size.size;
    // if selected size is different to null then 
    if(SelectedSize != null)
        // return to the og color for the previous selected size
        document.getElementById('size-' + SelectedSize).style.backgroundColor = '#171d20';
        // Change the Bcolor for the selected size
        document.getElementById('size-' + size.sku).style.backgroundColor = '#689f38'; 
        SelectedSize = size.sku;
}

function incrementQuantity(){
    console.log('Quantity updated +1...');
    // increment counter +1
    updateQuantity(++quantity);
}
function decrementQuantity(){
    console.log('Quantity updated -1...');
    // if the counter is over 1 then decrement -1
    if(quantity > 1)
    updateQuantity(--quantity);
}
function updateQuantity(q){
    // get the value of where we will put the counter
    document.getElementById("showQuantity").innerHTML = q;
}

// function to update the rating stars
function executeRating(stars, result) {
    // constants for the active / unactive stars class
    const starClassActive = "rating_star fa-solid fa-star fa-2xl";
    const starClassUnactive = "rating_star fa-regular fa-star fa-2x";
    const starsLength = stars.length; // 5

    stars.map((star) => {
        star.onclick = () => {
            var i = stars.indexOf(star);
          
            if (star.className.indexOf(starClassUnactive) !== -1) {
                printRatingResult(result, i + 1);
                for (i; i >= 0; --i) stars[i].className = starClassActive;
            } 
            else {
                printRatingResult(result, i);
                for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
            }
            console.log("Stars rating changed..");
        };
    });
 }
 
 function printRatingResult(result) {
    result.textContent = "";
 }

 function buy(buyBtn){
    buyBtn.onclick = () => {
        console.log("Buy btn clicked..")    
    }
}

// Handle error
function errorHandler(errorMessage) {
    console.log(errorMessage)
}