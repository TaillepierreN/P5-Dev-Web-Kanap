// /// récupérer tout les produits

export function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function (gotProducts) {
            return gotProducts.json();
        })
        .catch((err) => {
            console.log(err);
        })
}

export function getProduct(id) {
    fetch("http://localhost:3000/api/products" + "/" + id)
        .then(function (gotProduct) {
            return gotProduct.json();
        })
        .catch((err) => {
            console.log(err);
        })

}

export function order(sentOrder) {
    const options = {
        method: 'POST',
        body: JSON.stringify(sentOrder),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    fetch("http://localhost:3000/api/products/order", options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.removeItem("storedCart");
            document.location.href = 'confirmation.html?id=' + data.orderId;
        })
}