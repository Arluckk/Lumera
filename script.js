const products = [
  {
    id: 1,
    name: "Sun Veil SPF 50",
    category: "skincare",
    categoryName: "SUNCARE",
    price: 699,
    oldPrice: 899,
    rating: "4.9",
    badge: "BESTSELLER",
    description: "Lightweight invisible sunscreen with SPF 50 PA++++. Non-greasy and perfect for everyday use.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 2,
    name: "Cloud Milk Lotion",
    category: "body",
    categoryName: "BODY CARE",
    price: 599,
    oldPrice: 749,
    rating: "4.8",
    badge: "NEW",
    description: "A silky body lotion enriched with shea butter and ceramides for soft, deeply hydrated skin.",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 3,
    name: "Glow Reset Serum",
    category: "skincare",
    categoryName: "SERUM",
    price: 899,
    oldPrice: 1099,
    rating: "4.9",
    badge: "BESTSELLER",
    description: "Brightening vitamin C serum designed to improve the appearance of dull and uneven skin.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 4,
    name: "Rose Dew Cream",
    category: "skincare",
    categoryName: "MOISTURIZER",
    price: 749,
    oldPrice: 949,
    rating: "4.8",
    badge: "",
    description: "A luxurious daily moisturizer that leaves skin soft, plump and beautifully hydrated.",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 5,
    name: "Silk Skin Body Oil",
    category: "body",
    categoryName: "BODY CARE",
    price: 799,
    oldPrice: 999,
    rating: "4.7",
    badge: "NEW",
    description: "Nourishing body oil with a silky finish and subtle botanical fragrance.",
    image: "https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 6,
    name: "Soft Blur Tint",
    category: "makeup",
    categoryName: "MAKEUP",
    price: 649,
    oldPrice: 799,
    rating: "4.8",
    badge: "TRENDING",
    description: "Lightweight skin tint with buildable coverage and a natural blurred finish.",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 7,
    name: "Lip Cloud Nude",
    category: "makeup",
    categoryName: "LIP COLOR",
    price: 499,
    oldPrice: 599,
    rating: "4.9",
    badge: "BESTSELLER",
    description: "Soft matte lip color with a comfortable cloud-like texture.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=700&q=85"
  },
  {
    id: 8,
    name: "Barrier Rescue Cleanser",
    category: "skincare",
    categoryName: "CLEANSER",
    price: 549,
    oldPrice: 699,
    rating: "4.9",
    badge: "",
    description: "Gentle low-foam cleanser designed to cleanse without leaving skin feeling dry.",
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=700&q=85"
  }
];

let cart = [];
let currentProducts = products.slice();

function renderProducts(list) {
  const grid = document.getElementById("productGrid");

  if (!grid) return;

  grid.innerHTML = "";

  list.forEach(function(product) {
    grid.innerHTML += `
      <div class="product">

        <div class="product-image" onclick="openProduct(${product.id})">

          ${product.badge ? `<span class="badge">${product.badge}</span>` : ""}

          <button class="wishlist"
            onclick="event.stopPropagation(); wishlist(this)">
            ♡
          </button>

          <img src="${product.image}" alt="${product.name}">

          <button class="quick-add"
            onclick="event.stopPropagation(); addToCart(${product.id})">
            ADD TO BAG +
          </button>

        </div>

        <div class="product-info" onclick="openProduct(${product.id})">

          <div class="product-category">
            ${product.categoryName}
          </div>

          <div class="product-name">
            ${product.name}
          </div>

          <div class="rating">
            ★★★★★ <span>${product.rating}</span>
          </div>

          <div class="price">
            ₹${product.price}
            <span class="old-price">₹${product.oldPrice}</span>
          </div>

        </div>

      </div>
    `;
  });
}

function filterProducts(category, button) {
  document.querySelectorAll(".filter").forEach(function(btn) {
    btn.classList.remove("active");
  });

  if (button) {
    button.classList.add("active");
  }

  if (category === "all") {
    currentProducts = products.slice();
  } else {
    currentProducts = products.filter(function(product) {
      return product.category === category;
    });
  }

  renderProducts(currentProducts);
}

function openProduct(id) {
  const product = products.find(function(p) {
    return p.id === id;
  });

  if (!product) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalCategory").textContent = product.categoryName;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById("modalPrice").textContent = "₹" + product.price;

  document.getElementById("modalAddButton").onclick = function() {
    addToCart(product.id);
    closeModal("productModal");
  };

  document.getElementById("productModal").classList.add("show");
}

function addToCart(id) {
  const product = products.find(function(p) {
    return p.id === id;
  });

  if (!product) return;

  const existing = cart.find(function(item) {
    return item.id === id;
  });

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  updateCart();
  showToast(product.name + " added to your bag");
}

function updateCart() {
  const count = cart.reduce(function(total, item) {
    return total + item.quantity;
  }, 0);

  document.getElementById("cartCount").textContent = count;

  const container = document.getElementById("cartItems");

  if (!cart.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:70px 10px;color:#777">
        <h3 style="font-family:Playfair Display;font-size:28px">
          Your bag is empty
        </h3>
        <p style="margin-top:10px">
          Add something beautiful.
        </p>
      </div>
    `;

    document.getElementById("subtotal").textContent = "₹0";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cart.forEach(function(item) {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">

        <img src="${item.image}" alt="${item.name}">

        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>

          <div class="quantity">

            <button onclick="changeQuantity(${item.id}, -1)">−</button>

            <span>${item.quantity}</span>

            <button onclick="changeQuantity(${item.id}, 1)">+</button>

          </div>
        </div>

        <button class="remove" onclick="removeFromCart(${item.id})">
          Remove
        </button>

      </div>
    `;
  });

  document.getElementById("subtotal").textContent =
    "₹" + total.toLocaleString("en-IN");
}

function changeQuantity(id, amount) {
  const item = cart.find(function(item) {
    return item.id === id;
  });

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(function(item) {
      return item.id !== id;
    });
  }

  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(function(item) {
    return item.id !== id;
  });

  updateCart();
  showToast("Item removed from your bag");
}

function openCart() {
  document.getElementById("cartPanel").classList.add("open");
  updateCart();
}

function closeCart() {
  document.getElementById("cartPanel").classList.remove("open");
}

function checkout() {
  if (!cart.length) {
    showToast("Your bag is empty");
    return;
  }

  closeCart();

  const total = cart.reduce(function(sum, item) {
    return sum + item.price * item.quantity;
  }, 0);

  document.getElementById("checkoutTotal").textContent =
    "₹" + total.toLocaleString("en-IN");

  document.getElementById("checkoutModal").classList.add("show");
}

function placeOrder() {
  const name = document.getElementById("checkoutName").value.trim();
  const email = document.getElementById("checkoutEmail").value.trim();
  const phone = document.getElementById("checkoutPhone").value.trim();

  if (!name || !email || !phone) {
    showToast("Please complete your contact details");
    return;
  }

  const paymentElement =
    document.querySelector('input[name="payment"]:checked');

  const payment = paymentElement ? paymentElement.value : "upi";

  closeModal("checkoutModal");

  const orderNumber =
    "LM" + Math.floor(100000 + Math.random() * 900000);

  document.getElementById("orderNumber").innerHTML =
    "Thank you, " + name +
    ". Your order <strong>#" + orderNumber +
    "</strong> has been placed using " +
    payment.toUpperCase() + ".";

  document.getElementById("successModal").classList.add("show");

  cart = [];
  updateCart();
}

function openLogin() {
  document.getElementById("loginModal").classList.add("show");
}

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showToast("Please enter email and password");
    return;
  }

  closeModal("loginModal");
  showToast("Welcome back to Luméra ✨");
}

function signup() {
  showToast("Account creation coming next");
}

function openSearch() {
  document.getElementById("searchOverlay").classList.add("show");

  setTimeout(function() {
    document.getElementById("searchInput").focus();
  }, 100);
}

function closeSearch() {
  document.getElementById("searchOverlay").classList.remove("show");
}

function searchProducts() {
  const query = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

  const results = products.filter(function(product) {
    return (
      product.name.toLowerCase().includes(query) ||
      product.categoryName.toLowerCase().includes(query)
    );
  });

  document.getElementById("searchResults").innerHTML =
    results.map(function(product) {
      return `
        <div class="search-result"
             onclick="closeSearch(); openProduct(${product.id})">

          <span>${product.name}</span>
          <strong>₹${product.price}</strong>

        </div>
      `;
    }).join("");
}

function wishlist(button) {
  if (button.textContent.trim() === "♡") {
    button.textContent = "♥";
    showToast("Added to wishlist");
  } else {
    button.textContent = "♡";
    showToast("Removed from wishlist");
  }
}

function subscribe() {
  const email = document.getElementById("emailInput").value.trim();

  if (!email) {
    showToast("Please enter your email");
    return;
  }

  document.getElementById("emailInput").value = "";
  showToast("Welcome to the Glow Club ✨");
}

function showStory() {
  alert(
    "LUMÉRA is a modern beauty brand focused on simple, elegant and everyday skincare."
  );
}

function scrollToShop() {
  document.getElementById("shop").scrollIntoView({
    behavior: "smooth"
  });
}

function closeModal(id) {
  document.getElementById(id).classList.remove("show");
}

function closeAll() {
  document.querySelectorAll(".modal").forEach(function(modal) {
    modal.classList.remove("show");
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(function() {
    toast.classList.remove("show");
  }, 2500);
}


/* START WEBSITE */

renderProducts();
updateCart();
