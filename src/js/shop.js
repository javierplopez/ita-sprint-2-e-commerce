// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
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
}

// Exercise 2
const cleanCart = () =>  {
    cart.length = 0; // Reinitialize cart array
    document.getElementById('count_product').textContent = '0'; // Reset counter
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
}


// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {

}

const open_modal = () =>  {
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
});