import { menuArray } from './data.js';
const menuDiv = document.getElementById('menu');

menuArray.forEach((menuItem) => {
  const menuItemDiv = document.createElement('div');
  menuItemDiv.classList.add('menu__item')
  menuItemDiv.innerHTML = `
    <div class="menu__item-emoji">${menuItem.emoji}</div>
    <div class="menu__item-description">
      <h4 class="menu__item-name">${menuItem.name}</h4>
      <p class="menu__item-ingredients">${menuItem.ingredients.join(', ')}</p>
      <p class="menu__item-price">$${menuItem.price}</p>
    </div>
    <div class="menu__item-circle">
      <button id="order" class="menu__item-plus">+</button>
    </div>`;
  menuDiv.appendChild(menuItemDiv);
});

