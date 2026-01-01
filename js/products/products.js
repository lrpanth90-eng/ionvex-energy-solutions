const products = [
  {
    id: 1,
    name: "48V 100Ah Lithium",
    category: "2W",
    image: "/assets/images/batteries/2w/48v-100ah.png",
    warranty: "3 Years"
  },
  {
    id: 2,
    name: "60V 120Ah Lithium",
    category: "2W",
    image: "/assets/images/batteries/2w/60v-120ah.png",
    warranty: "3 Years"
  },
  {
    id: 3,
    name: "48V 150Ah Lithium",
    category: "3W",
    image: "/assets/images/batteries/3w/48v-150ah.png",
    warranty: "3 Years"
  },
  {
    id: 4,
    name: "72V 200Ah Lithium",
    category: "4W",
    image: "/assets/images/batteries/4w/72v-200ah.png",
    warranty: "3 Years"
  }
];

const grid = document.getElementById("productGrid");

function loadProducts(list) {
  grid.innerHTML = "";
  list.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.category} EV Battery</p>
        <span class="badge">${p.warranty}</span>
      </div>
    `;
  });
}

function filterProducts(type) {
  if (type === "all") {
    loadProducts(products);
  } else {
    loadProducts(products.filter(p => p.category === type));
  }
}

loadProducts(products);
