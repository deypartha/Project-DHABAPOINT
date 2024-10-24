let cart = []; // shopping cart
let allMenuItems = []; 
let displayedCount =5; 

// Proceed to payment
document.getElementById('proceed-button').onclick = function() {
    const orderDetails = {
        items: cart,
        total: document.getElementById('total-price').textContent
    };
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'paymentsystem.html';
};

// Add item to cart
function addToCart(index, item) {
    const existingItem = cart.find(cartItem => cartItem.index === index);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, index, quantity: 1 });
    }
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = ''; // Clear previous items
    let totalPrice = 0;

    cart.forEach(cartItem => {
        const { name, price, quantity } = cartItem;
        const itemTotal = price * quantity;
        totalPrice += itemTotal;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div style="display: flex; align-items: center;">
                <span>${name} - $${price.toFixed(2)} x ${quantity} = $${itemTotal.toFixed(2)}</span>
                <img src="./image/breakfast/${name}.jpg" alt="${name}">
                <div>
                    <button onclick="removeFromCart(${cartItem.index})">-</button>
                    <button onclick="increaseQuantity(${cartItem.index})">+</button>
                </div>
            </div>
        `;
        cartItemsDiv.appendChild(div);
    });

    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    document.getElementById('proceed-button').style.display = totalPrice > 0 ? 'block' : 'none';
}

// Remove item from cart
function removeFromCart(index) {
    const itemIndex = cart.findIndex(cartItem => cartItem.index === index);
    if (itemIndex > -1) {
        cart[itemIndex].quantity--;
        if (cart[itemIndex].quantity === 0) {
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
    }
}

function increaseQuantity(index) {
    const cartItem = cart.find(cartItem => cartItem.index === index);
    if (cartItem) {
        cartItem.quantity++;
        updateCartDisplay();
    }
}

function displayMenu(menuItems, category) {
    const cont = document.getElementById(category);
    cont.innerHTML = ''; // Clear previous items

    if (!menuItems.length) {
        cont.innerHTML = `<p>No items available for ${category}.</p>`;
        return;
    }

    const itemsToDisplay = menuItems.slice(0, displayedCount);
    itemsToDisplay.forEach((item, index) => {
        const { name, price, discount } = item; 
        const discountedPrice = (price - (price * (discount / 100))).toFixed(2);

        const div = document.createElement('div');
        div.classList.add('item-container1');
        div.innerHTML = `
            <img src="./image/${category}/${name}.jpg" alt="${name}" style="width: 100%; height: auto;"> 
            <div class="item-header">
                <h4>${name}</h4>
                <button class="buttonrate">${discount ? 4.4 : 4.0}<i class="fa-regular fa-star"></i></button>
            </div>
            <div class="price-offer">
                <h5 style="text-decoration: line-through; color: red;">Price: $${price.toFixed(2)}</h5>
                <p>${discount || 0}% off</p>
                <h5><strong>Now: $${discountedPrice}</strong></h5>
            </div>
            <div>
                <button class="add-to-cart m-1" onclick="addToCart(${index}, { name: '${name}', price: ${discountedPrice} })">
                    Add to cart
                </button>
            </div>
        `;
        cont.appendChild(div);
    });

    // Store all menu items for search
    allMenuItems = [...allMenuItems, ...menuItems];

    // Show or hide "Show More" and "Show Less" buttons
    document.getElementById('showMoreBtn').style.display = displayedCount < menuItems.length ? 'block' : 'none';
    document.getElementById('showLessBtn').style.display = displayedCount > 3 ? 'block' : 'none';
}

// Fetch menu data from server
async function fetchMenuData() {
    try {
        const [breakfastResponse, lunchResponse, dinnerResponse] = await Promise.all([
            fetch('http://localhost:3003/breakfast'),
            fetch('http://localhost:3003/Lunch'), 
            fetch('http://localhost:3003/dinner')
        ]);

        const breakfastItems = await breakfastResponse.json();
        displayMenu(breakfastItems, 'breakfast');

        const lunchItems = await lunchResponse.json();
        displayMenu(lunchItems, 'lunch');

        const dinnerItems = await dinnerResponse.json();
        displayMenu(dinnerItems, 'dinner');
    } catch (error) {
        console.error('Error fetching menu data:', error);
        // Display an error message
        document.getElementById('breakfast').innerHTML = `<p>Error loading breakfast items.</p>`;
        document.getElementById('lunch').innerHTML = `<p>Error loading lunch items.</p>`;
        document.getElementById('dinner').innerHTML = `<p>Error loading dinner items.</p>`;
    }
}

// Load data on page load
window.onload = () => {
    fetchMenuData();
    setupSearch(); // Initialize search after loading data
};

// Set up search functionality
function setupSearch() {
    const searchInput = document.querySelector("[data-search]");
    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
        const filteredItems = allMenuItems.filter(({ name }) => 
            name.toLowerCase().includes(value)
        );
        displaySearchResults(filteredItems);
    });
}

function displaySearchResults(items) {
    const menuContainer = document.querySelector('.menu-category');
    menuContainer.innerHTML = ''; // Clear current menu items

    if (!items.length) {
        menuContainer.innerHTML = `<p>No results found.</p>`;
        return;
    }

    items.forEach((item, index) => {
        const { name, price, discount } = item; 
        const discountedPrice = (price - (price * (discount / 100))).toFixed(2);

        const div = document.createElement('div');
        div.classList.add('item-container1');
        div.innerHTML = `
            <img src="./image/breakfast/${name}.jpg" alt="${name}" style="width: 100%; height: auto;"> 
            <div class="item-header">
                <h4>${name}</h4>
                <button class="buttonrate">${discount ? 4.4 : 4.0}<i class="fa-regular fa-star"></i></button>
            </div>
            <div class="price-offer">
                <h5 style="text-decoration: line-through; color: red;">Price: $${price.toFixed(2)}</h5>
                <p>${discount || 0}% off</p>
                <h5><strong>Now: $${discountedPrice}</strong></h5>
            </div>
            <div>
                <button class="add-to-cart m-1" onclick="addToCart(${index}, { name: '${name}', price: ${discountedPrice} })">
                    Add to cart
                </button>
            </div>
        `;
        menuContainer.appendChild(div);
    });
}

// Show more items
function showMore() {
    displayedCount += 5; 
    fetchMenuData(); 
}

// Show less items
function showLess() {
    displayedCount = Math.max(5, displayedCount - 5); 
    fetchMenuData(); 
}
