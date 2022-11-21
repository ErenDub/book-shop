let basket = [];
function fillBasket (){
  let basketItemsBox = document.getElementById("basket-items");
  basketItemsBox.innerHTML = ''
  basket.length === 0 && (basketItemsBox.innerHTML = 'Basket is empty')
  basket.map((item, i) => {
      basketItemsBox.innerHTML += `<div id="basket${i}" class="basket-item">${item.title} - ${item.author} - $${item.price} | <button onClick="removeItem(${i})"">Remove</button></div>`
  })
  let total = 0 
  basket.forEach(item => total+=item.price)
  total !== 0 && (basketItemsBox.innerHTML += `<div class="basket-total">Total: $${total}</div>`)
  total !== 0 && (basketItemsBox.innerHTML += `<div><a href="../orderPage/index.html"><button>Order</button></a></div>`)
}
async function fetchFucn() {
  let fetchData = false;
  await fetch("../json/books.json") //path to the file with json data
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      fetchData = data;
    });
  if (fetchData) {
    let result = document.getElementById("result");
    fetchData.map((item, i) => {
      result.innerHTML += `
        <div class="book-item" >
        <div class="book-item-img">
          <img
            src=${item.imageLink}
            alt=${item.title}
          />
        </div>
        <div class="book-item-title">${item.title}</div>
        <div class="book-item-button" id=${i}><button>Show More</button></div>
      </div>
      <div class="book-modal modalNone" id="modal${i}">
        <div class="book-modal-box">
          <div class="modal-item-img">
            <img
              src=${item.imageLink}
              alt=${item.title}
            />
            <div class="modal-button">
              <button class="modal-button-close" id="close${i}">Close</button>
              <button class="modal-button-basket" id="add${i}">Add to basket</button>
            </div>
          </div>
          <div class="book-modal-description">
              <div class="book-modal-title">
              ${item.title}
              </div>
              <div class="book-modal-author">
                  <b>Author: </b> ${item.author}
              </div>
              <div class="book-modal-price">
                  <b>Price: </b> $${item.price}
              </div>
              <div class="book-modal-desc">
                  <b>Description: </b> ${item.description}
              </div>
              
          </div>
        </div>
      </div>
        `;
    });
  }

  let books = document.getElementsByClassName("book-item-button");
  Array.from(books).forEach(function (element) {
    element.addEventListener("click", function () {
      openModal(element);
    });
  });

  function openModal(element) {
    let elementId = element.getAttribute("id");
    document.getElementById(`modal${elementId}`).classList.remove("modalNone");
  }

  let bookModals = document.getElementsByClassName("modal-button-close");
  Array.from(bookModals).forEach(function (element) {
    element.addEventListener("click", function () {
      closeModal(element);
    });
  });
  function closeModal(element) {
    let elementId = element.getAttribute("id").split("close");
    document.getElementById(`modal${elementId[1]}`).classList.add("modalNone");
  }
  



  let basketItems = document.getElementsByClassName("modal-button-basket");
  let basketItemsBox = document.getElementById("basket-items");
  
  Array.from(basketItems).forEach(function (element) {
    element.addEventListener("click", function () {
        addItem(element);
    });
  });

  function addItem(element) {
    let elementId = element.getAttribute("id").split('add')[1];
    basket.push(fetchData[elementId])
    fillBasket()
  }




}
fetchFucn();
basket.length === 0 && (document.getElementById("basket-items").innerHTML = 'Basket is empty')
function removeItem(elementId){
  let filteredBasket = basket.filter((item, index) => index !== elementId)
  basket = filteredBasket
  fillBasket()
}