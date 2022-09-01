const form = document.getElementById("toDoEntry");

form.elements[1].addEventListener("click", function(click) {
   click.preventDefault();
    let ulList = document.getElementById("todo-list");

    let li = createListInDOM(form.elements[0].value);
    ulList.appendChild(li); 
});

function createListInDOM(text) {
  // create list element for unorder list
  const list = document.createElement("li");
  //create text to add to list item
  const textNode = document.createTextNode(text);
  // add the text to the new list item
  list.appendChild(textNode);
// return the new list item to the event listener to add to the unordered list
  return list;
}