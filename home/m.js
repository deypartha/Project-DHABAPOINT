async function fetchMenuData() {
    try {
        const response = await fetch('http://localhost:3000/breakfast'); // Replace with your actual endpoint
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const menuData = await response.json();
        renderMenu(menuData); // Call the function to render the menu
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function renderMenu(menuData) {
    const menuContainer = document.getElementById('menu');
    menuContainer.innerHTML = '';

    menuData.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'item-container1'; // Use the new class

        const discountedPrice = (item.price - item.discount).toFixed(2);

        menuItem.innerHTML = `
            <img src="${item.imageLink}" alt="${item.name}">
            <div class="item-header">
                <h2>${item.name}</h2>
                <button class="buttonrate">${item.rating} ★</button>
            </div>
            <div class="price-offer">
                <h2>Price: $${item.price.toFixed(2)} <span style="text-decoration: line-through; color: red;">$${item.price.toFixed(2)}</span> <strong>Now: $${discountedPrice}</strong></h2>
            </div>
            <button class="add-to-cart" onclick="addToCart('${item.name}')">Add to Cart</button>
        `;

        menuContainer.appendChild(menuItem);
    });
}

function addToCart(itemName) {
    alert(`${itemName} has been added to your cart!`);
}

// Fetch and render the menu data when the page loads
fetchMenuData();
