import { shoppingLists, currentViewing } from "./index.js";
import { defaultImageSrc } from "./data.js";
import {
  shoppingListElement,
  addItem,
  disableInput,
  enableInput,
  removeEmptyListAlert,
  showEmptyListAlert,
} from "./elements.js";

export const itemObject = ({
  id = shoppingLists[currentViewing].items.length,
  title = "Not provided",
  note = null,
  imgSrc = defaultImageSrc,
  checked = false,
} = {}) => {
  return { id, title, note, imgSrc, checked };
};

export function listRefresh() {
  const currentList = shoppingLists[currentViewing];

  if (currentList.items?.length === 0) showEmptyListAlert();
  if (currentList.items?.length > 0) removeEmptyListAlert();
  if (currentList.items?.length === 10) disableInput();
  if (currentList.items?.length < 10) enableInput();

  updateCheckedCount();
  updateAsideList();
  saveLocalStorage();
}

export function onSubmitItem(e) {
  e.preventDefault();
  const inputItem = e.target.querySelector(".item-input");
  if (inputItem.value.length < 3) return;

  const newItem = itemObject({ title: inputItem.value });

  shoppingLists[currentViewing].items.push(newItem);

  addItem(newItem);
  listRefresh();

  inputItem.value = "";
}

function getShoppingListId(shoppingItem) {
  const itemId = +shoppingItem.dataset.itemId;
  return shoppingLists[currentViewing].items.findIndex(
    (item) => item.id === itemId
  );
}

export function removeItem(e) {
  const shoppingItem = e.target.closest(".shopping-item");
  const shoppingListId = getShoppingListId(shoppingItem);

  if (shoppingListId !== -1)
    shoppingLists[currentViewing].items.splice(shoppingListId, 1);

  shoppingItem.remove();

  listRefresh();
}

export function addOrCheckItem(e) {
  const shoppingItem = e.target.closest(".shopping-item");
  const shoppingListId = getShoppingListId(shoppingItem);

  if (shoppingListId !== -1) {
    const item = shoppingLists[currentViewing].items[shoppingListId];
    item.checked = !item.checked;

    shoppingItem.remove();
    addItem(itemObject(item));
  }
  listRefresh();
}

function updateCheckedCount() {
  const count = shoppingLists[currentViewing].items.filter(
    (item) => item.checked === true
  ).length;

  const checkedList = shoppingListElement.querySelector(".checked-list");
  if (!checkedList) return;

  if (count > 0) {
    checkedList.querySelector(
      ".title-count"
    ).textContent = `${count} checked off`;
  } else {
    checkedList.remove();
  }
}

function updateAsideList() {
  /* For testing purposes */
  const count = shoppingLists[currentViewing].items.length;
  const text = `${
    count > 0 ? (count > 1 ? `${count} items` : "1 item") : "Empty"
  }`;

  document.querySelector("aside .list .count").textContent = text;
}

export function loadLocalStorage() {
  if (!localStorage.getItem("shopping-lists")) return;

  const localStorageData = JSON.parse(localStorage.getItem("shopping-lists"));
  /* Replace data from shoppingLists with data from localStorage */
  shoppingLists.splice(0, 1);
  shoppingLists.push(localStorageData[0]);

  shoppingLists.forEach((list) => {
    list.items.forEach((item) => addItem(item));
  });
}

export function saveLocalStorage() {
  localStorage.setItem("shopping-lists", JSON.stringify(shoppingLists));
}
