const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json";
let product = {};
let imageDiv = document.querySelector('.image-div');
function getData() {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        product = data.product;
        console.log(product);
        const image =  product.images[1];
        // imageDiv.innerHTML = `<img src=${image} class='my' alt="Item"/>`
        console.log(image);
    })
    .catch((err) => {
        console.log(err);
    });
   
}
getData();




