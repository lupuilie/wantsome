import { ingredients, defaultImageSrc } from "./data.js";
import { currentViewing, shoppingLists } from "./index.js";
import { addOrCheckItem, removeItem } from "./functions.js";
import createElement from "../utils/createElement.js";

export const itemInput = document.querySelector(".item-input");
export const submitBtn = document.querySelector(".submit-item");
export const addItemForm = document.querySelector(".add-item");
export const suggestionsWrapper = document.querySelector(
  ".suggestions-wrapper"
);
export const emptyList = document.querySelector(".empty-list");
export const shoppingListElement = document.querySelector(".shopping-list");

export const materialIcon = (name) => {
  return createElement("span", {
    className: "material-icons",
    textContent: name,
  });
};
export function disableInput() {
  itemInput.setAttribute("disabled", true);
  submitBtn.setAttribute("disabled", true);
}

export function enableInput() {
  if (itemInput.hasAttribute("disabled")) itemInput.removeAttribute("disabled");
  if (submitBtn.hasAttribute("disabled")) submitBtn.removeAttribute("disabled");
}
export const showEmptyListAlert = () => {
  const emptyList = createElement("div", { className: "empty-list" });
  const bigRoundIcon = createElement("div", { className: "big-round-icon" });

  const icon = createElement("span", {
    className: "material-icons md-48",
    textContent: "list",
  });
  bigRoundIcon.append(icon);

  const strong = createElement("strong", { textContent: "Your list is empty" });
  const p = createElement("p", {
    textContent:
      "Start adding things you need to make sure nothing's left behind. You can also share shopping lists with others",
  });

  emptyList.append(bigRoundIcon, strong, p);

  shoppingListElement.append(emptyList);
};

export const removeEmptyListAlert = () => {
  const emptyList = document.querySelector(".empty-list");
  if (emptyList) emptyList.remove();
};

const itemsNotChecked = () => {
  const itemsList = document.querySelectorAll(
    ".shopping-list > .items-list"
  )[0];
  const checkedList = shoppingListElement.querySelector(".checked-list");

  if (!itemsList) {
    if (checkedList) {
      shoppingListElement
        .querySelector(".checked-list")
        .before(createElement("ul", { className: "items-list" }));
    } else {
      shoppingListElement.append(
        createElement("ul", { className: "items-list" })
      );
    }
  }
  return shoppingListElement.querySelector(".items-list");
};

const checkedItemsList = () => {
  const selector = ".checked-list .items-list";
  const checkedList = shoppingListElement.querySelector(selector);
  const checkedCount = shoppingLists[currentViewing].items.filter(
    (ingredient) => ingredient.checked === true
  ).length;

  if (!checkedList) {
    const element = createElement("div", { className: "checked-list" });
    if (checkedCount === 1) element.classList.add("visible");
    const title = createElement("p", {
      className: "title",
      id: "checked-list-toggle",
    });
    const icon = createElement("span", {
      className: "material-icons icon",
      textContent: "expand_more",
    });
    const titleCount = createElement("span", {
      className: "title-count",
    });
    title.append(icon, titleCount);

    const itemsList = createElement("ul", { className: "items-list" });
    element.append(title, itemsList);

    /* Toggle checked list visible */
    title.addEventListener("click", () => element.classList.toggle("visible"));

    shoppingListElement.append(element);
  }

  return shoppingListElement.querySelector(selector);
};

const itemOptionsMarkup = ({ id = null, checked = false } = {}) => {
  const shoppingItemOptions = createElement("div", {
    className: "shopping-item-options",
  });
  const addOrCheckBtn = createElement("button", {
    className: "btn bg-transparent",
  });
  const deleteBtn = createElement("button", {
    className: "btn bg-transparent",
  });
  const addOrCheckIcon = createElement("span", {
    className: "material-icons",
    textContent: checked ? "add" : "done",
  });

  const deleteIcon = createElement("span", {
    className: "material-icons",
    textContent: "delete",
  });
  addOrCheckBtn.append(addOrCheckIcon);
  deleteBtn.append(deleteIcon);

  /* Event listeners */
  addOrCheckBtn.addEventListener("click", addOrCheckItem);
  deleteBtn.addEventListener("click", removeItem);

  shoppingItemOptions.append(addOrCheckBtn, deleteBtn);

  return shoppingItemOptions;
};

export const addItem = (item) => {
  const { id, title, note, imgSrc, checked } = item;
  const isDefaultImage = imgSrc === defaultImageSrc;

  const itemsList = !checked ? itemsNotChecked() : checkedItemsList();

  const shoppingItem = createElement("li", { className: "shopping-item" });
  shoppingItem.dataset.itemId = id;
  const image = createElement("img", {
    className: "image",
    src: imgSrc,
    alt: `Image with ${title}`,
  });

  if (isDefaultImage) {
    image.classList.add("default");
    image.alt = "Default cover";
  }

  const itemDetails = createElement("div", { className: "item-details" });
  const itemTitle = createElement("p", { textContent: title });
  itemDetails.append(itemTitle);
  if (note)
    itemDetails.append(
      createElement("p", { textContent: note, className: "note" })
    );

  const shoppingItemOptions = itemOptionsMarkup({ checked });
  shoppingItem.append(image, itemDetails, shoppingItemOptions);

  itemsList.append(shoppingItem);
};
