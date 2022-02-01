const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id")
const addToCartBtn = document.getElementById('addToCart');
let DOMtitle = document.getElementById('title');
let DOMprice = document.getElementById('price');
let DOMdesc = document.getElementById('description');
let DOMcolors = document.getElementById("colors");
let cartItem = {};
let cart = [];
let notFound = false

getProduct();


//Recuperer les donnée du produit en fonction de son ID
function getProduct() {
    fetch("http://localhost:3000/api/products/" + id)
        .then(function (gotProduct) {
            if (gotProduct.ok) {
                return gotProduct.json();
            } else {
                notFound = true;
                return notFound;
            }
        })
        .catch((err) => {
            console.log(err);

        })

        // modification du DOM avec les donnée du produit
        .then(function (gotCanape) {
            if (!notFound) {
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
            } else {
                //si produit n'existe pas,refais la page
                document.querySelector('.item').innerHTML = "";
                document.querySelector('.item').appendChild(document.createElement("div")).classList.add("item__content");
                document.querySelector('.item__content').appendChild(document.createElement("div")).classList.add("item__content__titlePrice");
                document.querySelector('.item__content__titlePrice').appendChild(document.createElement("h1")).id = "title";
                document.querySelector('.item__content').appendChild(document.createElement("div")).classList.add("item__content__addButton");
                document.querySelector('.item__content__addButton').appendChild(document.createElement("a")).id = "backmenu";
                document.getElementById("backmenu").appendChild(document.createElement("button")).id = "addToCart";
                document.getElementById('title').innerText = "Produit non existant";
                document.getElementById('addToCart').innerText = "Retour a l'acceuil";
                document.getElementById('backmenu').href = "http://127.0.0.1:5500/front/html/index.html";
            }

        })
};

//function lancé au click bouton "ajout au panier"
addToCartBtn.addEventListener("click", function () {

    let nbrArticle = document.getElementById('quantity').value;
    let choosenColor = DOMcolors.value;

    //Vérifie si les valeurs ne sont pas vide pour eviter de lancer la fonction inutilement
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
                alert(`${nbrArticle} produit ajouté a votre panier`);

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
        // price: DOMprice.innerHTML,
        imageUrl: DOMimg.src,
        description: DOMdesc.innerHTML,
        altTxt: DOMimg.alt,
        nbrArticle: nbrArticle,
    }
    // push de l'objet dans l'array a mettre dans le panier
    cart.push(cartItem);
    localStorage.setItem("storedCart", JSON.stringify(cart));
    alert(`${nbrArticle} produit ajouté a votre panier`);
}