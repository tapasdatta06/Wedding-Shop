// Dark/Light Mode Toggle
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Cart Handling
let cart = [];

function addToCart(productName, priceBDT) {
  cart.push({ name: productName, price: priceBDT, color: "Default" });
  displayCart();
}

function displayCart() {
  let cartDiv = document.getElementById("cartItems");
  cartDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    cartDiv.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - ${item.price} BDT</p>
        <label>Color:</label>
        <select onchange="changeColor(${index}, this.value)">
          <option value="Default" ${item.color==="Default"?"selected":""}>Default</option>
          <option value="Red" ${item.color==="Red"?"selected":""}>Red</option>
          <option value="Blue" ${item.color==="Blue"?"selected":""}>Blue</option>
          <option value="Gold" ${item.color==="Gold"?"selected":""}>Gold</option>
        </select>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  cartDiv.innerHTML += `
    <h3>Total: ${total} BDT</h3>
    <button onclick="pay()">Pay</button>
  `;
}

function changeColor(index, newColor) {
  cart[index].color = newColor;
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  displayCart();
}

function pay() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Payment successful! Thank you for shopping.");
  cart = [];
  displayCart();
}

// Signup
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let email = document.getElementById("signupEmail").value.trim();
  let password = document.getElementById("signupPassword").value.trim();

  if (!email || !password) {
    document.getElementById("signupMessage").textContent = "Please fill all fields!";
    return;
  }

  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPassword", password);
  document.getElementById("signupMessage").textContent = "Signup successful! You can now login.";
});

// Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let storedEmail = localStorage.getItem("userEmail");
  let storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
    document.getElementById("loginMessage").textContent = "Login successful!";
    document.getElementById("signup").classList.add("hidden");
    document.getElementById("login").classList.add("hidden");
    document.getElementById("products").classList.remove("hidden");
    document.getElementById("cartSection").classList.remove("hidden");
    window.location.hash = "#products";
  } else {
    document.getElementById("loginMessage").textContent = "Invalid credentials!";
  }
});

// Logout
function logout() {
  document.getElementById("loginMessage").textContent = "Logged out!";
  document.getElementById("signup").classList.remove("hidden");
  document.getElementById("login").classList.remove("hidden");
  document.getElementById("products").classList.add("hidden");
  document.getElementById("cartSection").classList.add("hidden");
  window.location.hash = "#login";
}
