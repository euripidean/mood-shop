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

// ------------------------------
// add items to the cart
function addItem(name, price) {
	for (let i = 0; i < cart.length; i+= 1) {
		if (cart[i].name === name) {
			cart[i].quantity += 1;
			return;
		}
	}
	const item = {
		name,
		price,
		quantity: 1,
	};
	cart.push(item);
}

// ------------------------------
// Remove Items from Cart
function removeItem(name, quantity = 0) {
	for (let i = 0; i < cart.length; i+= 1) {
		if(cart[i].name === name) {
			if (quantity > 0) {
			cart[i].quantity -= quantity;
			}
			if (cart[i].quantity < 1 || quantity === 0) {
				cart.splice(i,1);
			}
			return;
		}
	}
}


// ------------------------------
// Show Items
function showItems() {
	const quantity = getQuantity();
	const total = getTotal();
	console.log(`You have ${quantity} items in your cart. The total cost of your order is $${total}.`)
	for (let i = 0; i < cart.length; i+=1) {
		console.log(`${cart[i].name} - ${cart[i]}.price - x ${cart[i].quantity}`);
	};
};

// ------------------------------
// Get Quantity
function getQuantity() {
	let quantity = 0;
	for (let i =0; i < cart.length; i++) {
		quantity += cart[i].quantity; 
	};

	return quantity;
}

// ------------------------------
// Get Total
function getTotal() {
	let total = 0;
	for (let i =0; i < cart.length; i++) {
		total =+ cart[i].price * cart[i].quantity;
	};

	return total.toFixed(2);
}

// ------------------------------
// ------------------------------
