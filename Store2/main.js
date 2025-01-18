// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");

// Function to set the theme
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    document.documentElement.setAttribute("data-theme", "dark");
    themeToggle.classList.remove("bx-moon");
    themeToggle.classList.add("bx-sun");
  } else {
    document.body.classList.remove("dark");
    document.documentElement.setAttribute("data-theme", "light");
    themeToggle.classList.remove("bx-sun");
    themeToggle.classList.add("bx-moon");
  }
}

// Function to toggle the theme
function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  setTheme(!isDark);

  // Save theme preference to localStorage
  localStorage.setItem("theme", isDark ? "light" : "dark");
}

// Load saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  setTheme(true); // Apply dark theme
} else {
  setTheme(false); // Apply light theme
}

// Add event listener to the theme toggle button
themeToggle.addEventListener("click", toggleTheme);

// Cart Toggle
const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("close-cart");

cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

closeCart.addEventListener("click", (event) => {
  event.stopPropagation(); // Stop event propagation
  cart.classList.remove("active");
});

// Close cart when clicking outside of it
document.addEventListener("click", (event) => {
  if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
    cart.classList.remove("active");
  }
});

// Add to Cart
const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

function addToCart(event) {
  const product = event.target.parentElement;
  const title = product.querySelector(".product-title").innerText;
  const price = product.querySelector(".price").innerText;
  const imgSrc = product.querySelector(".product-img").src;

  const cartItem = {
    title,
    price,
    imgSrc,
  };

  addItemToCart(cartItem);
}

function addItemToCart(item) {
  const cartContent = document.querySelector(".cart-content");

  // Check if item already exists in the cart
  const cartItems = cartContent.querySelectorAll(".cart-box");
  for (const cartItem of cartItems) {
    const cartItemTitle = cartItem.querySelector(".cart-product-title").innerText;
    if (cartItemTitle === item.title) {
      alert("This item is already in your cart!");
      return;
    }
  }

  // Create new cart item
  const cartBox = document.createElement("div");
  cartBox.classList.add("cart-box");
  cartBox.innerHTML = `
    <img src="${item.imgSrc}" alt="${item.title}" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${item.title}</div>
      <div class="cart-price">${item.price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="bx bx-trash cart-remove"></i>
  `;
  cartContent.appendChild(cartBox);

  // Add event listeners for the new cart item
  cartBox.querySelector(".cart-remove").addEventListener("click", removeCartItem);
  cartBox.querySelector(".cart-quantity").addEventListener("change", updateTotal);

  updateTotal();
}

// Remove Item from Cart
function removeCartItem(event) {
  const cartBox = event.target.parentElement;
  cartBox.remove();
  updateTotal();
}

// Update Total Price
function updateTotal() {
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;

  cartBoxes.forEach((cartBox) => {
    const priceElement = cartBox.querySelector(".cart-price");
    const quantityElement = cartBox.querySelector(".cart-quantity");

    const price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantity = parseInt(quantityElement.value);

    total += price * quantity;
  });

  // Update total price in the cart
  const totalPriceElement = document.querySelector(".total-price");
  totalPriceElement.innerText = `$${total.toFixed(2)}`;
}

// Initialize event listeners for existing cart items
function initializeCart() {
  const cartRemoveButtons = document.querySelectorAll(".cart-remove");
  const cartQuantityInputs = document.querySelectorAll(".cart-quantity");

  cartRemoveButtons.forEach((button) => {
    button.addEventListener("click", removeCartItem);
  });

  cartQuantityInputs.forEach((input) => {
    input.addEventListener("change", updateTotal);
  });
}

// Call initializeCart to set up event listeners for existing items
initializeCart();