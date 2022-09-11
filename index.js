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
  // add delete button to list element
  list.appendChild(deleteButton);

  list.addEventListener("click", function(e) {
      for(let i = 0; i < toDoItems.length; i++ ) {
        if(toDoItems[i].value == e.target.textContent) {
         toDoItems[i].finished = !toDoItems[i].finished
        }
        if(toDoItems[i].finished) {
          e.target.style.textDecoration = "line-through"
        }
      }
     
    //  let strikeThrough = (e.target.style.textDecoration = "line-through");
    //  if(e.target.textContent.length > 0) {
    //   return strikeThrough;
    //  }
     localStorage.setItem('listItem', JSON.stringify(toDoItems));
  });
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
