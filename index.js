const formInput = document.getElementById("toDoEntryText");
const formBtn = document.getElementById("submit");
const ulList = document.getElementById("todo-list");

let toDoItems = [];


if (localStorage.getItem("listItem")) {
  toDoItems = getStorageItems();
  printToDoItems();
}

function printToDoItems() {
  let ulList = document.getElementById("todo-list");

  for (let i = 0; i < toDoItems.length; i++) {
    const li = createListItem(toDoItems[i].value);
    ulList.appendChild(li);
  }
}

function getStorageItems() {
  const storageItem = localStorage.getItem("listItem");
  // parses/converts json array to javascript array
  return JSON.parse(storageItem);
}

function setStorageItems() {
  localStorage.setItem("listItem", JSON.stringify(toDoItems));
}

function createListItem(text) {
  let listItem = document.createElement("li");

  const textNode = document.createTextNode(text);

  listItem.appendChild(textNode);

  let deleteButton = deleteListItem(listItem, text);

  listItem.appendChild(deleteButton);

  listItem.addEventListener("click", function (e) {
    for (let i = 0; i < toDoItems.length; i++) {
      if (toDoItems[i].value == e.target.value) {
        toDoItems[i].finished = !toDoItems[i].finished;
      }
    }

    localStorage.setItem("listItem", JSON.stringify(toDoItems));
    setLineThrough(listItem, listItem.finished, listItem.id);
    console.log(listItem, listItem.finished, listItem.id);
  });

  return listItem;
}

function setLineThrough(item, finished) {
  console.log(finished, item);
  if (finished) {
    return item.style.textDecoration = 'line-through'
  }
  
  return item.style.textDecoration = 'none';
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

formBtn.addEventListener("click", function (click) {
  click.preventDefault();

  let ulList = document.getElementById("todo-list");

  let li = createListItem(formInput.value);

  ulList.appendChild(li);

  const todoItem = {
    id: toDoItems.length,
    value: formInput.value,
    finished: false,
  };

  toDoItems.push(todoItem);

  localStorage.setItem("listItem", JSON.stringify(toDoItems));
  formInput.value = "";
});
