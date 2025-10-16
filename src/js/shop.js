import { products } from './products.js';

// Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart = [];

let total = 0;

// Exercise 1
const buy = (id) => {
    // 1. Loop for to the array products to get the item to add to cart
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    // 2. Add found product to the cart array
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    // Update cart counter in UI
    document.getElementById('count_product').textContent = 
        cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart display
    printCart();
}

// Exercise 2
const cleanCart = () =>  {
    cart.length = 0; // Reinitialize cart array
    document.getElementById('count_product').textContent = '0'; // Reset counter
    
    // Update cart display
    printCart();
}

// Exercise 3
const calculateTotal = () =>  {
    // Calculate total price of the cart using the "cart" array
    // Apply promotions first
    applyPromotionsCart();
    
    total = 0;
    for (let i = 0; i < cart.length; i++) {
        // Use discounted price if available, otherwise use regular price
        if (cart[i].subtotalWithDiscount !== undefined) {
            total += cart[i].subtotalWithDiscount;
        } else {
            total += cart[i].price * cart[i].quantity;
        }
    }
    return total;
}

// Exercise 4
const applyPromotionsCart = () =>  {
    // Apply promotions to each item in the array "cart"
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        
        // Check if the product has an offer and if quantity meets the requirement
        if (item.offer && item.quantity >= item.offer.number) {
            // Calculate price with discount
            const discountPrice = item.price * (1 - item.offer.percent / 100);
            // Calculate total with discount
            item.subtotalWithDiscount = discountPrice * item.quantity;
        } else {
            // Remove subtotalWithDiscount if no discount applies
            delete item.subtotalWithDiscount;
        }
    }
}

// Exercise 5
const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const cartList = document.getElementById('cart_list');
    const totalPriceElement = document.getElementById('total_price');
    
    // Clear existing cart content
    cartList.innerHTML = '';
    
    // Check if cart is empty
    if (cart.length === 0) {
        cartList.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
        totalPriceElement.textContent = '0';
        return;
    }
    
    // Generate cart items dynamically
    cart.forEach(item => {
        const row = document.createElement('tr');
        
        // Calculate item total (with discount if applicable)
        const itemTotal = item.subtotalWithDiscount !== undefined 
            ? item.subtotalWithDiscount 
            : item.price * item.quantity;
            
        row.innerHTML = `
            <th scope="row">${item.name}</th>
            <td>$${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-sm btn-danger remove-item" data-product-id="${item.id}" aria-label="Remove one ${item.name}">
                    -
                </button>
            </td>
        `;
        
        cartList.appendChild(row);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            removeFromCart(productId);
        });
    });
    
    // Update total price
    const total = calculateTotal();
    totalPriceElement.textContent = total.toFixed(2);
}

// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return; // Item not found in cart
    
    const item = cart[itemIndex];
    
    if (item.quantity === 1) {
        // Remove item completely if quantity is 1
        cart.splice(itemIndex, 1);
    } else {
        // Decrease quantity by 1
        item.quantity -= 1;
    }
    
    // Update cart counter
    document.getElementById('count_product').textContent = 
        cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart display
    printCart();
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            buy(parseInt(e.target.dataset.productId));
        });
    });
    
    // Clean cart button
    const cleanButton = document.getElementById('clean-cart');
    if (cleanButton) {
        cleanButton.addEventListener('click', cleanCart);
    }
    
    // Initialize cart display
    printCart();
});