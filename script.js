const url = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json";
let product = {};
let disc = document.querySelector('.discount');
function getData() {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        product = data.product;
        console.log(product);
        

        const discPercent = findDiscount(product);
        disc.innerHTML = `${discPercent}% Off`;
        
        
    })
    .catch((err) => {
        console.log(err);
    });
   
}
getData();

function findDiscount(product){
    let actualprice = Number(product.compare_at_price.slice(1));
    let discountprice = Number(product.price.slice(1));
    let discount = actualprice-discountprice;
    let discPercent = parseInt((discount/ actualprice)*100);
    return discPercent;
}


