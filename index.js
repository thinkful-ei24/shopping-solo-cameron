/* global $ */
'use strict';

const STORE = {
  items: [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  displayAll: true,
  filterBy: ''
};

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
  let displayedItems = [...STORE.items];
  if (!STORE.displayAll){
    displayedItems = displayedItems.filter(item => !item.checked);
  }
  if (STORE.filterBy !== ''){
    displayedItems = displayedItems.filter(item => item.name.includes(STORE.filterBy));
  }
  const itemHtml = displayedItems.map((item, index) => generateHtml(item, index)).join('');
  $('.js-shopping-list').html(itemHtml);
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const itemField = $('.js-shopping-list-entry');
    const name = itemField.val();
    itemField.val('');
    STORE.items.push({name, checked: false});
    renderShoppingList();
  });
}

function handleItemCheckClicked(){
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    const index = $(this).parents('.js-item-index-element').attr('data-item-index');
    STORE.items[index].checked = !STORE.items[index].checked;
    renderShoppingList();
  });
}

function handleDeleteItemClicked(){
  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    const index = $(this).parents('.js-item-index-element').attr('data-item-index');
    STORE.items.splice(index, 1);
    renderShoppingList();
  });
}

function handleDisplayChecked(){
  $('.js-display-checked').on('click', function(event){
    const checked = $('.js-display-checked').prop('checked');
    STORE.displayAll = checked;
    renderShoppingList();
  });
}

function handleTextFilter(){
  $('#js-filter-text').on('click', function(event){
    event.preventDefault();
    const textToFilter = $('.js-text-filter').val();
    STORE.filterBy = textToFilter;
    renderShoppingList();
  });
}

function handleClearFilter(){
  $('#js-clear-filter-btn').on('click', function(event){
    event.preventDefault();
    $('.js-text-filter').val('');
    STORE.filterBy = '';
    renderShoppingList();
  });
}

function handleShoppingList(){
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleDisplayChecked();
  handleTextFilter();
  handleClearFilter();
}

$(handleShoppingList);


