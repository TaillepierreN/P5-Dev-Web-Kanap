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

function createItem(){
    let nbrArticle = document.getElementById('quantity').value;
    let choosenColor = document.getElementById('colors').value;
    let DOMimg = document.getElementById('canapimg');

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
    cart.push(cartItem);
    localStorage.setItem("storedcart", JSON.stringify(cart));
}

function addToCart() {
    addToCartBtn.addEventListener("click", function () {

        let nbrArticle = document.getElementById('quantity').value;
        let choosenColor = document.getElementById('colors').value;
        let DOMimg = document.getElementById('canapimg');


        if (nbrArticle > 0 && choosenColor != null) {
            if (localStorage.getItem("storedcart") === null) {
                createItem();
            } else {
                cart = JSON.parse(localStorage.getItem("storedcart"));
                console.log(cart);
                let currentArray = cart.findIndex(f => f._id === id && f.colors === choosenColor);
                console.log(currentArray);
                if (currentArray >= 0){
                    cart[currentArray].nbrArticle = parseInt(cart[currentArray].nbrArticle) + parseInt(nbrArticle);
                    console.log(cart[currentArray].nbrArticle);
                    localStorage.setItem("storedcart", JSON.stringify(cart));
                } else {
                    createItem();
                }

            }
        }else{
        
        }
    })
}






//         fetch("http://localhost:3000/api/products/"+ id)
//         .then(function(res){
//             if(res.ok){
//                 return res.json()
//             } else {
//                 console.log("erreur")
//             }
//         })
//         .then(function(noname){
//             let nbrArticle = document.getElementById('quantity').value;
//             let choosenColor = document.getElementById('colors').value;

//             noname && Object.assign(cartItem, noname);
//             console.log(cartItem);
//             console.log(nbrArticle);
//             console.log(choosenColor);
//         })
//     })
// }

// a faire, ajouter le brn article et bonne couleur dans object cartItem puis stocké dans localstorage
// verifier si cartItem existe deja et ajouté nbr item