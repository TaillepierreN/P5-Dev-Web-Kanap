const id = document.URL.split("=").pop();
const addToCartBtn = document.getElementById('addToCart');
let DOMtitle = document.getElementById('title');
let DOMprice = document.getElementById('price');
let DOMdesc = document.getElementById('description');
let DOMcolors = document.getElementById("colors");
let cartItem = {};
let cart = [];

getProduct();


//Recuperer les donné du back
function getProduct() {
    fetch("http://localhost:3000/api/products/" + id)
        .then(function (gotProduct) {
            return gotProduct.json();
        })
        .catch((err) => {
            console.log(err);
        })

        // modification du DOM avec les donnée du back
        .then(function (gotCanape) {

            let canapeimg = document.createElement("img");
            let canapColors = gotCanape.colors;

            document.querySelector(".item__img").appendChild(canapeimg).src = gotCanape.imageUrl;
            canapeimg.id = "canapimg";
            canapeimg.alt = gotCanape.altTxt;
            DOMtitle.innerText = gotCanape.name;
            DOMprice.innerText = gotCanape.price;
            DOMdesc.innerText = gotCanape.description;

            for (let canapColor of canapColors) {
                let difoption = document.createElement("option");
                DOMcolors.appendChild(difoption);
                difoption.value = canapColor;
                difoption.innerText = canapColor;
            }
        })
};

//function lancé au click bouton "ajout au panier"
addToCartBtn.addEventListener("click", function () {

    let nbrArticle = document.getElementById('quantity').value;
    let choosenColor = DOMcolors.value;

    //check si les valeurs ne sont pas vide pour eviter de lancer la fonction inutilement
    if (nbrArticle > 0 && choosenColor != null) {

        //verification si un panier existe deja,sinon creation du panier et de l'objet contenu
        if (localStorage.getItem("storedCart") === null) {
            createItem();
        } else {
            //récupération du panier existant
            try {
                cart = JSON.parse(localStorage.getItem("storedCart"));
            } catch (error) {
                console.log(error)
            }

            //vérification si le panier a deja un produit ayant la meme ID et couleur,si oui récupere l'index de l'objet
            let currentArray = cart.findIndex(f => f._id === id && f.colors === choosenColor);
            //si un produit a été trouvé,son index vaut 0 ou plus,si rien n'a été trouvé, l'index sera de -1
            if (currentArray >= 0) {
                //rajoute la valeur numerique( parseInt transforme string en integer) du nombre d'article
                // séléctioné avec le nombre d'article déja dans le panier
                cart[currentArray].nbrArticle = parseInt(cart[currentArray].nbrArticle) + parseInt(nbrArticle);
                localStorage.setItem("storedCart", JSON.stringify(cart));
            } else {
                //crée une nouvelle entrée dans l'array du panier
                createItem();
            }

        }
    }
});

//Fonction appelée lors de la création d'objet dans le panier

function createItem() {
    let nbrArticle = document.getElementById('quantity').value;
    let choosenColor = DOMcolors.value;
    let DOMimg = document.getElementById('canapimg');

    //creation de l'objet contenant les données
    cartItem = {
        _id: id,
        colors: choosenColor,
        name: DOMtitle.innerHTML,
        price: DOMprice.innerHTML,
        imageUrl: DOMimg.src,
        description: DOMdesc.innerHTML,
        altTxt: DOMimg.alt,
        nbrArticle: nbrArticle,
    }
    // push de l'objet dans l'array a mettre dans le panier
    cart.push(cartItem);
    localStorage.setItem("storedCart", JSON.stringify(cart));
}