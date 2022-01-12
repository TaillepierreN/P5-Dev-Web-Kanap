const id = document.URL.split("=").pop();
const addToCartBtn = document.getElementById('addToCart');
let DOMtitle = document.getElementById('title');
let DOMprice = document.getElementById('price');
let DOMdesc = document.getElementById('description');
let DOMcolors = document.getElementById("colors");
let cartItem = {};
let cart = [];

getProduct();
addToCart();

//Recuperer les donné du back
function getProduct() {
    fetch("http://localhost:3000/api/products/" + id)
        .then(function (gotProduct) {
            if (gotProduct.ok) {
                return gotProduct.json();
            } else {
                console.log("aucun produit reçu")
            }
        })
        .catch((err) => {
            console.log(err);
        })

// modification du DOM avec les donnée du back

        .then(function (gotCanape) {

            let canapeimg = document.createElement("img");
            document.querySelector(".item__img").appendChild(canapeimg).src = gotCanape.imageUrl;
            canapeimg.alt = gotCanape.altTxt;
            canapeimg.id = "canapimg";

            DOMtitle.innerHTML = gotCanape.name;
            DOMprice.innerHTML = gotCanape.price;
            DOMdesc.innerHTML = gotCanape.description;

            let canapColors = gotCanape.colors;

            for (let canapColor of canapColors) {
                let difoption = document.createElement("option");
                DOMcolors.appendChild(difoption);
                difoption.value = canapColor;
                difoption.innerHTML = canapColor;
            }
            // canapColors.forEach(color => {
            //     let difoption = document.createElement("option");
            //     document.getElementById("colors").appendChild(difoption);
            //     difoption.value = color;
            //     difoption.innerHTML = color;
            // });


        })

};

//function lancé au click bouton "ajout au panier"
function addToCart() {
    addToCartBtn.addEventListener("click", function () {

        let nbrArticle = document.getElementById('quantity').value;
        let choosenColor = document.getElementById('colors').value;

        //check si les valeurs ne sont pas vide pour eviter de lancer la fonction inutilement
        if (nbrArticle > 0 && choosenColor != null) {

            //verification si un panier existe deja,sinon creation du panier et de l'objet contenu
            if (localStorage.getItem("storedcart") === null) {
                createItem();
            } else {

                //récupération du panier existant
                cart = JSON.parse(localStorage.getItem("storedcart"));

                //vérification si le panier a deja un produit ayant la meme ID et couleur,si oui récupere l'index de l'objet
                let currentArray = cart.findIndex(f => f._id === id && f.colors === choosenColor);
                //si un produit a été trouvé,son index vaut 0 ou plus,si rien n'a été trouvé, l'index sera de -1
                if (currentArray >= 0){
                    //rajoute la valeur numerique( parseInt transforme string en integer) du nombre d'article
                    // séléctioné avec le nombre d'article déja dans le panier
                    cart[currentArray].nbrArticle = parseInt(cart[currentArray].nbrArticle) + parseInt(nbrArticle);
                    localStorage.setItem("storedcart", JSON.stringify(cart));
                } else {
                    //crée une nouvelle entrée dans l'array du panier
                    createItem();
                }

            }
        }else{
        
        }
    })
}


//Fonction appelée lors de la création d'objet dans le panier

function createItem(){
    let nbrArticle = document.getElementById('quantity').value;
    let choosenColor = document.getElementById('colors').value;
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
    localStorage.setItem("storedcart", JSON.stringify(cart));
}

