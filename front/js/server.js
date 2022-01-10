// /// récupérer tout les produits

export function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function(gotProducts) {
            if(gotProducts.ok){
                return gotProducts.json();
            } else{
                console.log("Aucun produit reçu");
            }
        })
        .catch((err) =>{
            console.log(err);
        })
}

module.exports = {
    getProducts: getProducts,
};