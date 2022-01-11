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

function getProduct(id){
    fetch("http://localhost:3000/api/products"+ "/" + id)
    .then(function(gotProduct){
        if(gotProduct.ok){
            return gotProduct.json();
        } else {
            console.log("aucun produit reçu")
        }
    })
    .catch((err) =>{
        console.log(err);
    })

}

// module.exports = {
//     getProducts: getProducts,
// };