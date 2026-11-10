let cart = document.querySelectorAll('.add-cart');

let products = [
	{
		name: 'knotless Bold Stitch Cornrow',
		tag : '001',
		price : 120,
		inCart : 0
	},
	{
		name: 'All black cornrow',
		tag : '002',
		price : 90,
		inCart : 0
	},
	{
		name: 'product name',
		tag : '',
		price : 10,
		inCart : 0
	},

	{
		name: 'product name',
		tag : '',
		price : 10,
		inCart : 0
	},
]
for(let i=0; i < carts.length; i++) {
	carts[i].addEventListener('click', () => {
		cartNumbers(products[1]);
		totalCost(products[i])
	})
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers) {
		documents.querySelector('.cart span').textContent = productNumbers + 1;
	}
}

function cartNumbers(products) {
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);

	if(productNumbers ) {
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textcontent = productNumbers + 1;
	} else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textcontent = 1;
	}

	setItems(products);
	
}

function setItems(product) {
	let cartItems = localStorage.getItem('productsInCart')
	cartItems = JSON.parse(cartItems);
	
	if(cartItems != null) {

		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	} else {		
		product.inCart = 1;
		cartItems = {
			[product.tag]: product
		}
	}


	localStorage.setItem("productsInCart", JSON.stringify
	(cartItems));
}

function totalCost(product) {
	let cartCost = localStorage.getItem('totalCost');
	

	if(cartCost != null) {
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	} else {
		localStorage.setItem("totalCost", product.price);	
	}

	
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	cartItem = JSON.parse(cartItems);
	let productContainer = document.querySelector(".products");
	let cartCost = localStorage.getItem('totalCost');
	
	if( cartItems && productsContainer ) {
		productsContainer.innerHTML = '';
		Object.values(cartItems).map(item=>{
			productsContainer.innerHTML +=
				<div class="products">
					<ion-icon name="close-circle"></ion-icon>
					<img src="./img/image/${item.tag}.jpg"></img>
					<span>{item.name}</span>
				</div>
			;
			productsContainer.innerHTML +=
				<div class="price">$${item.price},00</div>
			;
			productsContainer.innerHTML +=
				<div class="quantity">	
					<ion-icon class="decrease " name="arrow-dropleft-circle"></ion-icon>
					<span>{item.inCart}</span>
					<ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
				</div>
			;
			productsContainer.innerHTML +=
				<div class="total">
					$${item.inCart * item.price},00
				</div>
			;   
		
		});

		productsContainer.innerHTML +=
			<div class="basketTotalContainer">
				<h4 class="basketTotalTitle">
					Basket Total
				</h4>
				<h4 class="basketTotal">
					$${cartCost},00
				</h4>
			</div>
		;

	}
}

onLoadCartNumbers();
displayCart();
console.log('displayCart')