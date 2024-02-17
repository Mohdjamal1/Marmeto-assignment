const url ="https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json";
let product = {};
let productCount = 0;
let size = "";
let color = "";

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      product = data.product;

      const heading = document.querySelector(".heading");
      heading.innerHTML = `<p>${product.vendor}</p>
                            <h2>${product.title}</h2>`;

      const discPercent = findDiscount(product);
      const pricediv = document.querySelector(".price-div");
      pricediv.innerHTML = `<div>
                            <div class="actualPrice">${product.price}</div>
                            <div class="discPrice"><strike>${product.compare_at_price}</strike></div>
                            </div>
                            <div class="discount">${discPercent}% Off</div>`;

      document.querySelector(
        ".footer"
      ).innerText = `${product.description.slice(25, -4)}`;
    })
    .catch((err) => {
      console.log(err);
    });
}
getData();

//Find the Discount function
function findDiscount(product) {
  let actualprice = Number(product.compare_at_price.slice(1));
  let discountprice = Number(product.price.slice(1));
  let discount = actualprice - discountprice;
  let discPercent = parseInt((discount / actualprice) * 100);
  return discPercent;
}
//Get the Selected Color
function selectColor() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      color = checkbox.value;
      // Uncheck other checkboxes when one is checked
      if (this.checked) {
        checkboxes.forEach((cb) => {
          if (cb !== this) {
            cb.checked = false;
          }
        });
      }
    });
  });
}
selectColor();

// Get the Selected size func
function selectSize() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach((item) => {
    item.addEventListener("change", function () {
      size = item.value;
    });
  });
}
selectSize();

//Decrease the product count
document.querySelector(".sub").addEventListener("click", function () {
  if (productCount > 0) {
    productCount = productCount - 1;
    document.querySelector(".count").innerText = `${productCount}`;
  }
});
//Increase the product count
document.querySelector(".add").addEventListener("click", function () {
  if (productCount < 10) {
    productCount = productCount + 1;
    document.querySelector(".count").innerText = `${productCount}`;
  } else {
    alert("Items not more than 10");
  }
});
document.querySelector(".count").innerText = `${productCount}`;

// Add to cart message div
document.querySelector(".cartBtn").addEventListener("click", function () {
  const cartinfo = document.querySelector(".cartinfo");
  cartinfo.innerText = `${product.title} with Color ${color} and Size ${size} added to cart`;
  cartinfo.style.display = "block";
});
