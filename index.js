/* global $ */
'use strict';

const STORE = [
  {name: 'apples', checked: false},
  {name: 'oranges', checked: false},
  {name: 'milk', checked: true},
  {name: 'bread', checked: false}
];

function generateHtml(item, index){
  return `
    <li class="js-item-index-element" 
    data-item-index="${index}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

function renderShoppingList(){
  const itemHtml = STORE.map((item, index) => generateHtml(item, index)).join('');
  $('.js-shopping-list').html(itemHtml);
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const itemField = $('.js-shopping-list-entry');
    const name = itemField.val();
    itemField.val('');
    STORE.push({name, checked: false});
    renderShoppingList();
  });
}

function handleItemCheckClicked(){
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    const index = $(this).parents('.js-item-index-element').attr('data-item-index');
    STORE[index].checked = !STORE[index].checked;
    renderShoppingList();
  });
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    const index = $(this).parents('.js-item-index-element').attr('data-item-index');
    STORE.splice(index, 1);
    renderShoppingList();
  })
}

function handleShoppingList(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);


