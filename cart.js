let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  updateCartDisplay();
}

function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  updateCartDisplay();
}

function clearCart() {
  cart = [];
  saveCart();
  updateCartDisplay();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-items');
  const totalDisplay = document.getElementById('total-price');
  if (!cartContainer || !totalDisplay) return;
  cartContainer.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} (x${item.qty}) - $${(item.price * item.qty).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price * item.qty;
  });

  totalDisplay.innerText = total.toFixed(2);
}
