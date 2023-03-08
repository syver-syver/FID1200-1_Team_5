const listTitle = document.querySelector("#list-title");
const itemList = document.querySelector("#item-list");
const addItemButton = document.querySelector("#add-item-button");

let currentListIndex;
let lists = [];

// Check local storage for existing lists
if (localStorage.getItem("lists")) {
  lists = JSON.parse(localStorage.getItem("lists"));
}

// Check if current list index is stored in local storage
if (localStorage.getItem("currentListIndex")) {
  currentListIndex = localStorage.getItem("currentListIndex");
  renderList();
}

// Render current list
function renderList() {
  const currentList = lists[currentListIndex];
  listTitle.textContent = currentList.name;
  itemList.innerHTML = "";
  currentList.items.forEach(function(item) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    itemList.appendChild(listItem);
  });
}

// Add event listener for adding new item
addItemButton.addEventListener("click", function() {
  const newItemName = prompt("Enter a name for the new item:");
  if (newItemName) {
    const currentList = lists[currentListIndex];
    currentList.items.push(newItemName);
    localStorage.setItem("lists", JSON.stringify(lists));
    renderList();
  }
});
