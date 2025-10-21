import { products } from './products.js';

const cart = [];

let total = 0;

// Exercise 1
const buy = (id) => {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    document.getElementById('count_product').textContent = 
        cart.reduce((sum, item) => sum + item.quantity, 0);
    
    printCart();
}

// Exercise 2
const cleanCart = () =>  {
    cart.length = 0;
    document.getElementById('count_product').textContent = '0';
    
    printCart();
}

// Exercise 3
const calculateTotal = () =>  {
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
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        
        if (item.offer && item.quantity >= item.offer.number) {
            const discountPrice = item.price * (1 - item.offer.percent / 100);
            item.subtotalWithDiscount = discountPrice * item.quantity;
        } else {
            delete item.subtotalWithDiscount;
        }
    }
}

// Exercise 5
const printCart = () => {
    const cartList = document.getElementById('cart_list');
    const totalPriceElement = document.getElementById('total_price');
    
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        cartList.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
        totalPriceElement.textContent = '0';
        return;
    }
    
    cart.forEach(item => {
        const row = document.createElement('tr');
        
        const itemTotal = item.subtotalWithDiscount !== undefined 
            ? item.subtotalWithDiscount 
            : item.price * item.quantity;
        
        let discountInfo = '';
        if (item.offer && item.quantity >= item.offer.number) {
            const discountPercent = item.offer.percent;
            const savedAmount = (item.price * item.quantity) - item.subtotalWithDiscount;
            discountInfo = `
                <span class="badge bg-success">
                    -${discountPercent}%
                </span>
                <small class="d-block text-success fw-bold mt-1">
                    Ahorras $${savedAmount.toFixed(2)}
                </small>
            `;
        } else if (item.offer) {
            discountInfo = `
                <small class="text-info">
                    <i class="fas fa-info-circle me-1"></i>
                    Compra ${item.offer.number} para ${item.offer.percent}% desc.
                </small>
            `;
        } else {
            discountInfo = '<span class="no-offer">Sin oferta</span>';
        }
            
        row.innerHTML = `
            <th scope="row">${item.name}</th>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <div class="quantity-controls d-flex align-items-center justify-content-center">
                    <button class="btn btn-sm btn-outline-secondary decrease-item" data-product-id="${item.id}" aria-label="Decrease ${item.name} quantity">
                        -
                    </button>
                    <span class="quantity-display mx-2 fw-bold">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary increase-item" data-product-id="${item.id}" aria-label="Increase ${item.name} quantity">
                        +
                    </button>
                </div>
            </td>
            <td class="text-center discount-column">${discountInfo}</td>
            <td>$${itemTotal.toFixed(2)}</td>
        `;
        
        cartList.appendChild(row);
    });
    
    document.querySelectorAll('.decrease-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            removeFromCart(productId);
        });
    });
    
    document.querySelectorAll('.increase-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.productId);
            addToCart(productId);
        });
    });
    
    const total = calculateTotal();
    totalPriceElement.textContent = total.toFixed(2);
}

// Exercise 7
const removeFromCart = (id) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex === -1) return;
    
    const item = cart[itemIndex];
    
    if (item.quantity === 1) {
        cart.splice(itemIndex, 1);
    } else {
        item.quantity -= 1;
    }
    
    document.getElementById('count_product').textContent = 
        cart.reduce((sum, item) => sum + item.quantity, 0);
    
    printCart();
}

const addToCart = (id) => {
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        buy(id);
        return;
    }
    
    document.getElementById('count_product').textContent = 
        cart.reduce((sum, item) => sum + item.quantity, 0);
    
    printCart();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            buy(parseInt(e.target.dataset.productId));
        });
    });
    
    const cleanButton = document.getElementById('clean-cart');
    if (cleanButton) {
        cleanButton.addEventListener('click', cleanCart);
    }
    
    printCart();
    
    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('.primary-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            header.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            header.classList.remove('scrolled');
        }
    });
});