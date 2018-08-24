/* global $ */
'use strict';

const STORE = {
  items: [],
  displayAll: true,
  filterBy: ''
};

function generateHtml(item, index){
  if (!item.edit){
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
      </li>`;}
  return `
    <li class="js-item-index-element" 
      data-item-index="${index}">
      <form id="js-edit-list-item">
      <label for="edit-list-item"></label>
      <input type="text" name="edit-list-item" value = "${item.name}" class="js-edit-list-item">
      <div class="shopping-item-controls">
        <button>
          <span class="button-label js-update-item">Update item</span>
        </button>
      </div>
      </form>
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
  for (let i=0; i<displayedItems.length; i++){
    displayedItems[i].indexer = i;
  }
  if (!STORE.displayAll){
    displayedItems = displayedItems.filter(item => !item.checked);
  }
  if (STORE.filterBy !== ''){
    displayedItems = displayedItems.filter(item => item.name.includes(STORE.filterBy));
  }
  const itemHtml = displayedItems.map(item => generateHtml(item, item.indexer)).join('');
  $('.js-shopping-list').html(itemHtml);
}

function handleNewItemSubmit(){
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault();
    const itemField = $('.js-shopping-list-entry');
    const name = itemField.val();
    itemField.val('');
    STORE.items.push({name, checked: false, edit: false});
    renderShoppingList();
  });
}

function handleItemCheckClicked(){
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    const index = $(this).parents('.js-item-index-element').attr('data-item-index');
    STORE.items[index].checked = !STORE.items[index].checked;
    console.log(STORE.items);
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

function handleInitialItemEdit(){
  $('.js-shopping-list').on('click', '.js-shopping-item',function(event){
    const index = $(this).parents('.js-item-index-element').attr('data-item-index');
    STORE.items[index].edit = true;
    renderShoppingList();  
  });
}

function handleItemUpdate(){
  $('.js-shopping-list').on('click', '.js-update-item', function(event){
    event.preventDefault();
    const index = $(this).parents('.js-item-index-element').attr('data-item-index');
    const updatedText = $(this).parents('.shopping-item-controls').prev('.js-edit-list-item').val();
    STORE.items[index].name = updatedText;
    STORE.items[index].edit = false;
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
  handleInitialItemEdit();
  handleItemUpdate();
}

$(handleShoppingList);


