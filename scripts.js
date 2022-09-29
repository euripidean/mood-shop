import data from './data.js';
const itemsContainer = document.querySelector('#items');
const itemList = document.getElementById('item-list');
const cartQty = document.getElementById('cart-qty');
const cartTotal = document.getElementById('cart-total');
itemList.innerHTML = '';

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

const all_items_button = Array.from(document.querySelectorAll("button"));

all_items_button.forEach(elt => elt.addEventListener('click', () => {
	addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
	showItems()
  }))

// Shopping Cart 

const cart = [];

// ------------------------------
// Handle clicks on list

itemList.onclick = function (e) {
	if (e.target && e.target.classList.contains('remove')) { 
		const name = e.target.dataset.name;
		removeItem(name);
		} else if 
		(e.target && e.target.classList.contains('add-one')) {
			const name = e.target.dataset.name;
			addItem(name)
		} else if 
		(e.target && e.target.classList.contains('remove-one')) {
			const name = e.target.dataset.name;
			removeItem(name, 1)
		}
}

// ------------------------------
// Handle update change on list

itemList.onchange = function (e) {
	if (e.target && e.target.classList.contains('update')) {
		const name = e.target.dataset.name;
		const quantity = parseInt(e.target.value);
		updateCart(name, quantity)
	}

}

// ------------------------------
// add items to the cart

function addItem(name, price) {
	for (let i = 0; i < cart.length; i+= 1) {
		if (cart[i].name === name) {
			cart[i].quantity += 1;
			showItems();
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
			showItems();
			return;
		}
	}
}

// ------------------------------
// Update Items

function updateCart(name, quantity) {
	for (let i = 0; i < cart.length; i+= 1) {
		if(cart[i].name === name) {
			if (quantity < 1) {
				removeItem(name);
			}
		cart[i].quantity = quantity;
		showItems();
		return;
		}
	}
}


// ------------------------------
// Show Items

function showItems() {
	const quantity = getQuantity();
	const total = getTotal();

	let itemStr = '';
	cartQty.innerHTML = (`<p>You have ${quantity} items in your cart.</p>`); 
	cartTotal.innerHTML = (`<p><b>The total cost of your order is <u>$${total}</u>.</b></p>`);

	if (!cart.length) {
		cartQty.innerHTML = (`You currently have no items in your cart.`)
	} else {
		for (let i = 0; i < cart.length; i+=1) {
			const { name, price, quantity } = cart[i];
			const subTotal = (price * quantity).toFixed(2);
			itemStr += `<li>
			<b>${name}</b> $${price} x ${quantity} = $${subTotal} 
			<button class="remove" data-name="${name}">Remove</button>
			<button class="add-one" data-name="${name}"> + </button>
			<button class="remove-one" data-name="${name}"> - </button>
			<input class="update" type="number" data-name="${name}" value="${quantity}">
			</li>`
		}};

	itemList.innerHTML = itemStr;
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
		total += cart[i].price * cart[i].quantity;
	};

	return total.toFixed(2);
}

// ------------------------------
// ------------------------------