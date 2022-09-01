const todos = [];

submit.addEventListener("click", function(click) {
   click.preventDefault();
    let ulList = document.getElementById("todo-list");

    let li = createListInDOM(click.target.value);
    ulList.appendChild(li);

    console.log("Click Test: ", ulList);
  
});

function createListInDOM(text) {
  const list = document.createElement("li");
  const textNode = document.createTextNode(text);
  list.appendChild(textNode);

  return list;
}

function click()
{ 
  window.event.preventDefault();

  todos.push("Hello there");

  
  console.log("To Do Array: ", todos);
}







//let x = document.toDoEntry.elements[0].text;
//console.log(x);