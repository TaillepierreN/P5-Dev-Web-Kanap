// import getProducts from "./service";


getProducts();

/**
 * Fonction pour afficher tout les produits disponible
 */
function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(function (gotProducts) {
            return gotProducts.json();
        })
        .catch((err) => {
            console.log(err);
        })


        // récuperer chaque canapé et crée l'objet sur le DOM

        .then(function (gotCanape) {
            const canapes = gotCanape;
            console.log(canapes);
            for (let canape of canapes) {

                let canapeLien = document.createElement("a");
                let canapeArticle = document.createElement("article");
                let canapeImg = document.createElement("img");
                let canapeH3 = document.createElement("h3");
                let canapeP = document.createElement("p");

                // Ajout structure DOM

                document.getElementById('items').appendChild(canapeLien).appendChild(canapeArticle).appendChild(canapeImg);
                canapeArticle.appendChild(canapeH3).classList.add("productName");
                canapeArticle.appendChild(canapeP).classList.add("productDescription");

                // Ajout contenu DOM
                canapeLien.href = `./product.html?id=${canape._id}`;
                canapeImg.src = canape.imageUrl;
                canapeImg.alt = canape.altTxt;
                canapeH3.innerText = canape.name;
                canapeP.innerText = canape.description;
            }
        })
};