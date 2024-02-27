const formInput = document.getElementById("toDoEntryText");
const formBtn = document.getElementById("submit");
const ulList = document.getElementById("todo-list");

let toDoItems = [];

function printToDoItems() {
  let ulList = document.getElementById("todo-list");

  for (let i = 0; i < toDoItems.length; i++) {
    const li = createListItem(toDoItems[i].value);

    ulList.appendChild(li);
  }
}

function setStorageItems() {
  localStorage.setItem("listItem", JSON.stringify(toDoItems));
}
function getStorageItems() {
  const storageItem = localStorage.getItem("listItem");
  // parses/converts json array to javascript array
  return JSON.parse(storageItem);
}

function createListItem(text) {
  let listItem = document.createElement("li");
  const textNode = document.createTextNode(text);
  listItem.appendChild(textNode);
  let deleteButton = deleteListItem(listItem, text);
  listItem.appendChild(deleteButton);

  listItem.addEventListener("click", function (e) {
    for (let i = 0; i < toDoItems.length; i++) {
      if (toDoItems[i].value == text) {
        toDoItems[i].finished = !toDoItems[i].finished;
      }
      // if (toDoItems[i].finished) {
      //   e.target.style.textDecoration = "line-through";
      // }
    }

   // let strikeThrough = (e.target.style.textDecoration = "line-through");
    // if (e.target.textContent.length > 0) {
    //   return strikeThrough;
    // }
    localStorage.setItem("listItem", JSON.stringify(toDoItems));
  });
  return listItem;
}

function deleteListItem(list, node) {
  let deleteButton = document.createElement("button");

  deleteButton.appendChild(document.createTextNode("X"));
  deleteButton.addEventListener("click", function () {
    list.remove();

    for (let i = 0; i < toDoItems.length; i++) {
      if (toDoItems[i].value == node) {
        toDoItems.splice(i, 1);
      }
    }
    localStorage.setItem("listItem", JSON.stringify(toDoItems));
  });
  return deleteButton;
}

if (localStorage.getItem("listItem")) {
  toDoItems = getStorageItems();
  printToDoItems();
}

formBtn.addEventListener("click", function (click) {
  click.preventDefault();

  let ulList = document.getElementById("todo-list");

  let li = createListItem(formInput.value);

  ulList.appendChild(li);

  const todoItem = {
    id: li.id,
    value: formInput.value,
    finished: false,
  };

  toDoItems.push(todoItem);

  localStorage.setItem("listItem", JSON.stringify(toDoItems));

  formInput.value = "";
});
