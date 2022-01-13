let openedCart = JSON.parse(localStorage.getItem("storedCart"));
const sectionItem = document.getElementById("cart__items");
const firstLastnameRegex = /^[a-zA-Z]/;

main();

function main() {
  openCart();
  deleteFromCart();
  changeQty();
}


function openCart() {
  if (openedCart.length) {
    sectionItem.innerHTML = ''
    let totalPrice = 0;
    let totalProduct = 0;
    for (let product of openedCart) {
      let productArticle = document.createElement("article");
      // let productImg = document.createElement("img");
      // let productDiv = document.createElement("div");


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
      <p>${product.price}</p>
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



      // productArticle.appendChild(productDiv).classList.add('cart__item__img');
      // document.querySelector('.cart__item__img').appendChild(productImg);
      // productArticle.appendChild(productDiv).classList.add("cart__item__content");
      // productImg.src = product.imageUrl;
      // productImg.alt = product.altTxt
    }
  }
}

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

// document.querySelector("cart__order__form").addEventListener('submit',function(){
//   const firstName = document.querySelector("#firstName")
//   let messageErrFirst = document.getElementById('firstNameErrorMsg');
//   const lastName = document.querySelector("#lasttName")
//   let error = false;
//   if(!firstLastnameRegex.test(firstName.value)){
//     //  erreur a true et affichage erreur.
//   }else {
//     //suppr message d'erreur
//   }
// })