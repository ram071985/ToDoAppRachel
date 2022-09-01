const form = document.getElementById("toDoEntry");

form.elements[1].addEventListener("click", function(click) {
   click.preventDefault();
    let ulList = document.getElementById("todo-list");

    let li = createListItem(form.elements[0].value);
    ulList.appendChild(li); 

    form.elements[0].value = "";
    
});

function createListItem(text) {
  // create list element for unorder list
  let list = document.createElement("li");
  //create text to add to list item
  const textNode = document.createTextNode(text);
  // add the text to the new list item
  list.appendChild(textNode);
  // get delete button
  let deleteButton = deleteListItem(list);
  // add delete button to list item
  list.appendChild(deleteButton);
// return the new list item to the event listener to add to the unordered list
  return list;

function deleteListItem(list) {
  let deleteButton = document.createElement("button");

  let textNode = document.createTextNode("X");

  deleteButton.appendChild(document.createTextNode("X"));

  deleteButton.addEventListener("click", function() {
    list.remove()
  })

  return deleteButton;
  }
}