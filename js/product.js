const url = new URL(window.location.href);
const productId = url.searchParams.get("id");

const productImage = document.querySelector(".product-image");
const productTitle = document.querySelector(".product-title");
const productPrice = document.querySelector(".product-price");
const productSize = document.querySelector(".product-size");
const addToCartBtn = document.querySelector(".add-to-cart-btn");
const productDescription = document.querySelector(".product-description");

async function getProduct() {
  if (!window.location.href.includes("product.html")) {
    return;
  }

  try {
    const response = await fetch(
      `https://rainydays-cma.flywheelsites.com/wp-json/wc/v3/products/${productId}?consumer_key=ck_b7d5f9a7eca859816bbe9d7f1a1134b8ebb2e44e&consumer_secret=cs_764aebbd432166b210a605379750a263fe3dbd00`
    );
    const product = await response.json();
    displayProduct(product);
  } catch (error) {
    console.log(error);
  }
}

function displayProduct(product) {
  // Set product image
  productImage.style.backgroundImage = `url('${product.images[0].src}')`;

  // Set product title
  productTitle.textContent = product.name;

  // Set product price
  productPrice.textContent = new Intl.NumberFormat("no-NO", {
    style: "currency",
    currency: "NOK",
  }).format(product.price);

  // Set product description
  productDescription.innerHTML = product.description;

  // Create select element for product size
  const sizeOptions = product.attributes.find(
    (attr) => attr.name === "Size"
  ).options;
  const sizeSelect = document.createElement("select");
  sizeSelect.name = "size";
  sizeSelect.id = "size-select";
  sizeOptions.forEach((size) => {
    const sizeOption = document.createElement("option");
    sizeOption.value = size;
    sizeOption.textContent = size;
    sizeSelect.appendChild(sizeOption);
  });
  productSize.appendChild(sizeSelect);
}

getProduct();
