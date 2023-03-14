import { menuArray } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
const menuDiv = document.getElementById('menu');
const order = document.getElementById('order');
let IsFirstOrder = true;

document.addEventListener('click', function (e) {
  if (e.target.dataset.order) {
    addToCart(e.target.dataset.order);
  } else if (e.target.dataset.remove) {
    removeFromCard(
      e.target.parentElement.parentElement.id,
      e.target.dataset.remove
    );
  } else if (e.target.dataset.complete) {
    completeOrder();
  } else if (e.target.dataset.pay) {
    e.preventDefault();
    payCard();
  }
});

renderMenu();

function renderMenu() {
  menuArray.forEach((menuItem) => {
    const menuItemDiv = document.createElement('div');
    menuItemDiv.classList.add('menu__item');
    menuItemDiv.innerHTML = `
      <div class="menu__emoji">${menuItem.emoji}</div>
      <div class="menu__description">
        <h4 class="menu__name">${menuItem.name}</h4>
        <p class="menu__ingredients">${menuItem.ingredients.join(', ')}</p>
        <p class="menu__price" >$${menuItem.price}</p>
      </div>
      <div class="menu__circle">
        <button class="menu__plus"  data-order="${menuItem.name}">+</button>
      </div>`;
    menuDiv.appendChild(menuItemDiv);
  });
}

function addToCart(foodName) {
  if (IsFirstOrder) {
    menuArray.forEach((menuItem) => {
      if (foodName === menuItem.name) {
        order.innerHTML = `
          <h1 class="order__title">Your Order</h1>
          <div id="order-list" class="order__list">
            <div id="${uuidv4()}" class="order__item">
              <div class="order__desc">
                <span class="order__name">${menuItem.name}</span>
                <button class="order__remove" data-remove="${
                  menuItem.name
                }">remove</button>
              </div>
              <p class="order__dollar">$<span id="price" class="order__price">${
                menuItem.price
              }</span></p>  
              
            </div>  
          </div>
          <div class="order__result">
            <span class="order__total">Total Price:</span>
            <p class="order__dollar">$<span id="total-price" class="total__price">${
              menuItem.price
            }</span></p>
          </div>
          <button class="order__complete" data-complete="card">Complete Order</button>`;
      }
    });

    IsFirstOrder = false;
  } else {
    let orderList = document.getElementById('order-list');

    menuArray.forEach((menuItem) => {
      if (foodName === menuItem.name) {
        orderList.innerHTML += `
        <div id="${uuidv4()}" class="order__item">
          <div class="order__desc">
            <span class="order__name">${menuItem.name}</span>
            <button class="order__remove" data-remove="${
              menuItem.name
            }">remove</button>
          </div> 
          <p class="order__dollar">$<span id="price" class="order__price">${
            menuItem.price
          }</span></p>  
        </div>  
        `;
      }
    });

    sumAllPrices();
  }
}

function sumAllPrices() {
  const allOrderPrices = document.querySelectorAll('#price');
  let totalPrice = document.getElementById('total-price');
  let currentPrice = 0;

  allOrderPrices.forEach((price) => {
    currentPrice += parseInt(price.textContent);
  });

  totalPrice.innerHTML = `${currentPrice}`;
}

function removeFromCard(orderItemId, foodName) {
  let allItems = document.querySelectorAll('.order__item');
  allItems.forEach((item) => {
    if (orderItemId === item.id) {
      subtractTotalPrice(foodName);

      item.remove();
    }
  });
}

function subtractTotalPrice(foodName) {
  let totalPrice = document.getElementById('total-price');
  let currentPrice = parseInt(totalPrice.textContent);

  menuArray.forEach((menuItem) => {
    if (menuItem.name === foodName) {
      currentPrice -= menuItem.price;
    }
  });

  totalPrice.innerHTML = `${currentPrice}`;
}

function completeOrder() {
  const card = document.getElementById('card');
  card.style.display = 'block';
}

function payCard() {
  const userInputName = document.getElementById('name');
  const main = document.getElementById('main');
  

  main.innerHTML += `
    <section class="message__box">
      <h2 class="message__text">Thanks, ${userInputName.value} Your order is on its way!</h2>
    </section>`;

  const card = document.getElementById('card');
  card.style.display = 'none';
}


