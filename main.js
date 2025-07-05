const products = [
  {
    id: 1,
    name: "Apple iPhone 14",
    price: 999.99,
    quantity: 10,
    weight: 0.5,
    image: "img/1.jpeg",
    description: "Latest iPhone with A15 Bionic chip, 5G capable",
  },

  {
    id: 2,
    name: "ice cream",
    price: 10,
    quantity: 100,
    weight: 0.5,
    image: "img/2.jpeg",
    description: "Ice cream with various flavors and toppings",
  },

  {
    id: 3,
    name: "Tomato",
    price: 3,
    quantity: 300,
    weight: 0.1,
    image: "img/3.jpeg",
    description: "Fresh Tomatoes, rich in vitamins and antioxidants",
  },

  {
    id: 4,
    name: "car",
    price: 100000,
    quantity: 2,
    weight: 1000,
    image: "img/4.jpeg",
    description: "this car is very fast and comfortable",
  },
];
const cart = [];
function Products() {
  const container = document.getElementById("pro-list");
  container.innerHTML = "";
  products.forEach((p) => {
    const col = document.createElement("div");
    col.className = "col-md-6";
    col.innerHTML = `
                        <div class = "pro-card h-100">
                            <img src="${p.image}" class="img-fluid mt-3" style="height: 150px;wight:100%; object-fit: cover;">
                            <h5 class="bold">${p.name}</h5>
                            <p class="pro-price mb-1">$ ${p.price}</p>
                            <p class="mb-1">${p.description}</p>
                            <p class="mb-1">In Stock: ${p.quantity}</p>
                            <button class="btn btn1 mb-3" onclick="addtocart(${p.id})">Add To Cart</button>
                        </div>
                    `;
    container.append(col);
  });
}
function addtocart(id) {
  const pro = products.find((p) => p.id === id);
  if (pro.quantity <= 0) {
    alert("out of stock");
    return;
  }
  pro.quantity -= 1;
  const existing = cart.find((i) => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...pro, qty: 1 });
  }
  card();
}
function card() {
  const ul = document.getElementById("list-cart");
  ul.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "d-flex justify-content-between align-items-center";
    li.innerHTML = `<span>${item.qty}x ${item.name}</span><strong>$${
      item.qty * item.price
    }</strong>`;
    ul.append(li);
  });
}
function checkout() {
  let total1 = 0;
  let shipping = 0;
  let weight = 0;
  let shipment = [];
  let output = "";

  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  cart.forEach((item) => {
    total1 += item.qty * item.price;
    weight += item.weight * item.qty;
    shipment.push(`${item.qty}x ${item.name}`);
  });

  if (weight < 5) {
    shipping = 5;
  } else if (weight < 20) {
    shipping = 10;
  } else {
    shipping = 20;
  }

  const total = total1 + shipping;

  output += "Checkout Receipt\n";
  output += "----------------------------\n";
  shipment.forEach((item) => {
    output += `${item}\n`;
  });
  output += `total: $${total1}\n`;
  output += `Fees: $${shipping}\n`;
  output += `Total Amount: $${total}\n`;

  document.getElementById("output").innerText = output;
}
Products();
