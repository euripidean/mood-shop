import data from './data.js';
const itemsContainer = document.querySelector('#items');

for (let i = 0; i < data.length; i += 1) {
	// create a new div element and give it a class name
	const newDiv = document.createElement('div');
	newDiv.className = 'item'
	// create an image element
	const img = document.createElement('img');
	// this will change each time we go through the loop. Can you explain why?
	img.src = data[i].image
	img.width = 300
	img.height = 300
	// Add the image to the div
	newDiv.appendChild(img)

	const name = document.createElement('h2');
	name.innerText = data[i].name.toUpperCase();
	newDiv.appendChild(name);

    const desc = document.createElement('p');
    desc.innerText = data[i].desc;
    newDiv.appendChild(desc)

    const price = document.createElement('p');
	const button = document.createElement('button')
	button.id = data[i].name
	button.dataset.price = data[i].price
	button.innerHTML = "Add to Cart"
	
    price.innerText = data[i].price;
    newDiv.appendChild(price)
	newDiv.appendChild(button)
	console.log(img) // Check the console!
	itemsContainer.appendChild(newDiv)
}

// Shopping Cart 

const cart = [];


function addItem(name, price, quantity) {
// function goes here
	const item = {name:name, price:price, quantity:1};
	cart.push(item);
}

function showItem() {
//function goes here
	console.log(`You have ${cart.length} items in your cart.`)
}

