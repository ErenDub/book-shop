let basket = [];
async function fetchFucn() {
    console.log(1)
  let fetchData = false;
  await fetch("json/books.json") //path to the file with json data
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
                  <b>Price: </b> ${item.price}
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
    basketItemsBox.innerHTML = ''
    basket.map(item => {
        basketItemsBox.innerHTML += `<div class="basket-item">${item.title}</div>`
    })

  }
}
console.log(123)
fetchFucn();

