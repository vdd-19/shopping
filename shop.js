// ================================
// SELECT ELEMENTS
// ================================
const productCartIcons = document.querySelectorAll('.box ion-icon'); // cart icon in product box
const headerCart = document.querySelector('.right'); // cart icon in header
const cartCountSpan = document.getElementById('cart-count'); // badge showing item count
const cartPanel = document.getElementById('cart-panel'); // right-side cart panel
const cartItemsDiv = document.getElementById('cart-items'); // div to list cart items
const cartTotalSpan = document.getElementById('cart-total'); // total price span
const placeOrderBtn = document.getElementById('place-order'); // place order button

let cart = []; // array to store cart items

// ================================
// ADD ITEM TO CART
// ================================
productCartIcons.forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.stopPropagation(); // prevent triggering header cart toggle

        const box = icon.parentElement;
        const name = box.querySelector('.name').textContent;
        const price = parseInt(box.querySelector('.price').textContent.replace('Rs.', ''));

        // check if item already exists in cart
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
    });
});

// ================================
// UPDATE CART UI
// ================================
function updateCart() {
    // total items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.textContent = totalItems;

    // update cart items in panel
    cartItemsDiv.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>Rs.${item.price * item.quantity}</span>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    cartTotalSpan.textContent = totalPrice;
}

// ================================
// TOGGLE CART PANEL
// ================================
headerCart.addEventListener('click', () => {
    cartPanel.classList.toggle('show');
});

// ================================
// PLACE ORDER
// ================================
placeOrderBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    let message = 'Order placed!\n\n';
    cart.forEach(item => {
        message += `${item.name} x${item.quantity} = Rs.${item.price * item.quantity}\n`;
    });
    message += `\nTotal: Rs.${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}`;

    alert(message);

    // clear cart after order
    cart = [];
    updateCart();
    cartPanel.classList.remove('show');
});
