const form = document.getElementById("toDoEntry");

let toDoItems = [];

// checks first for list items in local storage and sets the todo items array
// prints to do items added to to do items list from getLocalStorage function
if (localStorage.getItem('listItem')){
  getStorageItems();
  printToDoItems();
}

function printToDoItems() {
  let ulList = document.getElementById("todo-list");
  
  for (let i = 0; i < toDoItems.length; i++){
    let li = createListItem(toDoItems[i].value);

    if(toDoItems[i].finished) {
      li.style.textDecoration = "line-through";
      li.lastChild.checked = toDoItems[i].finished;
    }
      
    ulList.appendChild(li); 
  }
}

//checkbox/cross out items
//function crossOutItems();

form.elements[1].addEventListener("click", function(click) {
   click.preventDefault();

    let ulList = document.getElementById("todo-list");

    let li = createListItem(form.elements[0].value);
    ulList.appendChild(li);

// create list item object to store in array
    const todoItem = 
    { 
      value: form.elements[0].value, 
      finished: false 
    };
// add new list item object to array
    toDoItems.push(todoItem);

//save list items in local storage
    localStorage.setItem('listItem', JSON.stringify(toDoItems));
// clear input value 
    form.elements[0].value = "";

});

function getStorageItems() {
  let storageItem = localStorage.getItem('listItem');
  // parses/converts json array to javascript array
  toDoItems = JSON.parse(storageItem);
}

function createListItem(text) {
  // create list element for unordered list
  let list = document.createElement("li");
  //create text to add to list item
  const textNode = document.createTextNode(text);
  // add the text to the new list item
  list.appendChild(textNode);
  // get delete button
  let deleteButton = deleteListItem(list, text);
  // get checkbox
  let checkBox = createCheckBox(list, text);
  // add delete button to list element
  list.appendChild(deleteButton);
  // add checkbox to list element
  list.appendChild(checkBox);
// return the new list item to the event listener to add to the unordered list
// for(let i = 0; i < toDoItems.length; i++ ) {
//   if (toDoItems[i].finished)
//   {
//     list.style.textDecoration = "line-through";
//   }
//   else {
//     list.style.textDecoration = "";
//   }
// }
  return list;

function deleteListItem(list, node) {
  let deleteButton = document.createElement("button");

  deleteButton.appendChild(document.createTextNode("X"));
  deleteButton.addEventListener("click", function() {
    list.remove()

    for (let i = 0; i < toDoItems.length; i++) {
      if (toDoItems[i].value == node) {      
        toDoItems.splice(i, 1);
      }
    }
      localStorage.setItem('listItem', JSON.stringify(toDoItems));
  })
    return deleteButton;
  }
}

function createCheckBox(list, text) {
  let inputElement = document.createElement("INPUT");
  inputElement.setAttribute("type", "checkbox");

  inputElement.addEventListener("change", function(e) {
    for(let i = 0; i < toDoItems.length; i++ ) {
      if(toDoItems[i].value == text)
      {
        toDoItems[i].finished = !toDoItems[i].finished
      }
    }
    
    localStorage.setItem('listItem', JSON.stringify(toDoItems));
  });

  return inputElement;
}
