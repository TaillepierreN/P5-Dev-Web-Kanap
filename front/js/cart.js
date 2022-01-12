let openedCart = JSON.parse(localStorage.getItem("storedCart"));
const sectionItem = document.getElementById("cart__items");
let totalPrice = 0;
let totalProduct = 0;

openCart();
deleteFromCart();
displayTotal();

function openCart() {
    for (let product of openedCart) {
        let productArticle = document.createElement("article");
        // let productImg = document.createElement("img");
        // let productDiv = document.createElement("div");

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
            <p class="deleteItem">Supprimer ${product.name}</p>
          </div>
        </div>
      </div>`;


        totalPrice = totalPrice + (parseInt(product.price) * parseInt(product.nbrArticle));
        totalProduct = totalProduct + parseInt(product.nbrArticle)
        document.getElementById('totalQuantity').innerHTML = totalProduct;
        document.getElementById('totalPrice').innerHTML = totalPrice;



        // productArticle.appendChild(productDiv).classList.add('cart__item__img');
        // document.querySelector('.cart__item__img').appendChild(productImg);
        // productArticle.appendChild(productDiv).classList.add("cart__item__content");
        // productImg.src = product.imageUrl;
        // productImg.alt = product.altTxt
    }
}

function deleteFromCart() {
    let delBtn = document.querySelectorAll('.deleteItem');
    delBtn.forEach(btn => btn.addEventListener('click', function (event) {
        let target = event.target;
        let targetId = (target.closest('.cart__item')).getAttribute('data-id');
        let targetColor = (target.closest('.cart__item')).getAttribute('data-color');
        let foundProduct = openedCart.findIndex(f => f._id === targetId && f.colors === targetColor);
        openedCart.splice(foundProduct , 1);
        localStorage.setItem("storedCart", JSON.stringify(openedCart));
        location.reload();
    }))
}

function displayTotal() {
    let inputs = document.querySelectorAll(".cart__item__content__settings input");

    let prices = document.querySelectorAll(".cart__item__content__description p:nth-child(3)")

    inputs.forEach(changePrice => changePrice.addEventListener('change', function(e){
        totalProduct = 0;
        totalPrice = 0
        for(let input of inputs){
            totalProduct = totalProduct + parseInt(input.value);
            let price = (input.closest('.cart__item__content'));
            price = price.childNodes[1];
            price = price.childNodes[5];
            totalPrice = totalPrice + (parseInt(price.innerHTML) * parseInt(input.value));
            console.log(price);
        }

        document.getElementById('totalQuantity').innerHTML = totalProduct;
        document.getElementById('totalPrice').innerHTML = totalPrice;
    }));

    
}