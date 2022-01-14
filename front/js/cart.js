let openedCart = JSON.parse(localStorage.getItem("storedCart"));
const sectionItem = document.getElementById("cart__items");
let error = false;
const firstLastnameRegex = /^(([A-za-z]+[\s]{1}[A-za-z]+)|([A-Za-z\-]+)){3,255}$/;
const addressRegex = /[0-9]+(\s([a-zA-Z]+\s)+)[a-zA-Z]{3,255}$/i;
const cityRegex = /^(([A-za-z]+[s]{1}[A-za-z]+)|([A-Za-z- ]+)){2,255}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

main();

function main() {
  openCart();
  deleteFromCart();
  changeQty();
}

//récupere et affiche les canapé dans le DOM ainsi que leur prix total
function openCart() {
  if (openedCart.length) {
    sectionItem.innerHTML = ''
    let totalPrice = 0;
    let totalProduct = 0;
    for (let product of openedCart) {
      let productArticle = document.createElement("article");

      //Modification du DOM
      sectionItem.appendChild(productArticle).classList.add("cart__item");
      productArticle.setAttribute("data-id", product._id);
      productArticle.setAttribute("data-color", product.colors);
      productArticle.innerHTML = `
      <div class="cart__item__img">
           <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${product.colors}</p>
              <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                      <p>Qté :</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.nbrArticle}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                  </div>
            </div>
      </div>`;

      totalPrice = totalPrice + (parseInt(product.price) * parseInt(product.nbrArticle));
      totalProduct = totalProduct + parseInt(product.nbrArticle)
      document.getElementById('totalQuantity').innerText = totalProduct;
      document.getElementById('totalPrice').innerText = totalPrice;

    }
  }
}

// enleve un canapé du panier
function deleteFromCart() {
  let delBtn = document.querySelectorAll('.deleteItem');
  delBtn.forEach(btn => btn.addEventListener('click', function (event) {
    let target = event.target;
    let targetId = (target.closest('.cart__item')).getAttribute('data-id');
    let targetColor = (target.closest('.cart__item')).getAttribute('data-color');
    let foundProduct = openedCart.findIndex(f => f._id === targetId && f.colors === targetColor);
    openedCart.splice(foundProduct, 1);
    localStorage.setItem("storedCart", JSON.stringify(openedCart));
    main();
  }));

}

// change la quantité de canapé dans le panier
function changeQty() {
  let inputsQuantity = document.querySelectorAll(".cart__item__content__settings input");
  inputsQuantity.forEach(changePrice => changePrice.addEventListener('change', function (e) {
    let targetOfChange = e.target;
    if (targetOfChange.value < 0) {
      targetOfChange.value = 0
    }
    let idOfQuantity = targetOfChange.closest('.cart__item').getAttribute('data-id');
    let colorOfQuantity = targetOfChange.closest('.cart__item').getAttribute('data-color');
    let changedProduct = openedCart.findIndex(modified => modified._id === idOfQuantity && modified.colors === colorOfQuantity);
    openedCart[changedProduct].nbrArticle = targetOfChange.value;
    localStorage.setItem("storedCart", JSON.stringify(openedCart));
    main();
  }));
}

// Check form quand bouton submit est utilisé
document.querySelector(".cart__order__form").addEventListener('submit', function (s) {
  s.preventDefault();

  const firstName = document.getElementById("firstName");
  let messageErrFirstName = document.getElementById('firstNameErrorMsg');
  const lastName = document.getElementById("lastName");
  let messageErrLastName = document.getElementById('lastNameErrorMsg');
  let messageErrNameInner = 'Minimum 3 charactère.<br/>Ne doit contenir que des lettres minuscules ou majuscules.<br/>Les noms composé doivent être séparé par - ';

  const address = document.getElementById('address');
  let messageErrAddress = document.getElementById('addressErrorMsg');
  let messageErrAddressInner = 'Minimum 3 charactère.<br/>Veuillez respecter le format adresse valide : 10 quai de la charente'

  const city = document.getElementById('city');
  let messageErrCity = document.getElementById('cityErrorMsg');
  let messageErrCityInner = 'Minimum 3 charactère.<br/>Ne doit contenir que des lettres minuscules ou majuscules.'

  const email = document.getElementById('email');
  let messageErrEmail = document.getElementById('emailErrorMsg');
  let messageErrEmailInner = 'Doit etre une adresse email valide : JeanDoe42@gmail.com'
  // reset error pour nouvelle tentative
  if (error = true) {
    error = false;
  }
  //test chaque champ avec son regex
  regextest(firstLastnameRegex, firstName, messageErrFirstName, messageErrNameInner);
  regextest(firstLastnameRegex, lastName, messageErrLastName, messageErrNameInner);
  regextest(addressRegex, address, messageErrAddress, messageErrAddressInner);
  regextest(cityRegex, city, messageErrCity, messageErrCityInner);
  regextest(emailRegex, email, messageErrEmail, messageErrEmailInner)
  console.log('Status error: ' + error)

  if (!error) {
    const commande = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      },
      products: openedCart,
    }
    postCommande(commande);
    console.log(JSON.stringify(commande));
  }


})

// fonction de test regex
function regextest(regex, type, messErr, messErrInner) {
  if (regex.test(type.value) && type.value) {
    messErr.innerHTML = '';
  } else {
    error = true;
    messErr.innerHTML = messErrInner;
  }
}



function postCommande(sentOrder) {

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
  .then(data =>{
    console.log(data);
  })

}