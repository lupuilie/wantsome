import { ingredients } from "./data.js";
import createElement from "../utils/createElement.js";
import { materialIcon, addItem } from "./elements.js";
import { itemObject, listRefresh } from "./functions.js";
import { shoppingLists, currentViewing, maxItemsCount } from "./index.js";

export const maxSuggestedIngredients = 10;

const suggestionsWrapper = createElement("div", {
  className: "suggestions-wrapper",
});
const leftControls = createElement("div", {
  className: "suggestions-controls left visible",
});
const rightControls = createElement("div", {
  className: "suggestions-controls right visible",
});
const btnScrollLeft = createElement("button", { className: "btn-rounded" });
const btnScrollRight = createElement("button", { className: "btn-rounded" });
btnScrollLeft.append(materialIcon("chevron_left"));
btnScrollRight.append(materialIcon("chevron_right"));

/* Scroll Event Listener */
btnScrollLeft.addEventListener("click", () =>
  scrollSuggestions({ scroll: "right" })
);
btnScrollRight.addEventListener("click", scrollSuggestions);

leftControls.append(btnScrollLeft);
rightControls.append(btnScrollRight);
suggestionsWrapper.append(leftControls);

const suggestions = createElement("ul", { className: "suggestions" });
const ingredientsList = ingredients.slice(0, maxSuggestedIngredients);

ingredientsList.forEach((ingredient, index) => {
  const li = createElement("li");
  const button = createElement("button", {
    className: "btn-bordered suggested-item",
  });
  button.dataset.ingredient = index;
  /* Suggestion click */
  button.addEventListener("click", suggestionClick);

  const img = createElement("img", {
    src: ingredient.imgSrc,
    alt: `Image with ${ingredient.name}`,
  });
  const span = createElement("span", { textContent: ingredient.name });
  button.append(img, span);

  li.append(button);
  suggestions.append(li);
});

suggestionsWrapper.append(suggestions, rightControls);

function suggestionClick(e) {
  const clickedItem = e.target.closest(".suggested-item");
  if (!clickedItem) return;

  const ingredientId = +clickedItem.dataset.ingredient;
  const ingredient = ingredients[ingredientId];
  if (!ingredient) return;

  if (shoppingLists[currentViewing].items.length === maxItemsCount) return;

  const newItem = itemObject({
    title: ingredient.name,
    imgSrc: ingredient.imgSrc,
  });

  shoppingLists[currentViewing].items.push(newItem);

  addItem(newItem);
  listRefresh();
}

function scrollSuggestions({ scroll = "left" } = {}) {
  const suggestions = suggestionsWrapper.querySelector(".suggestions");
  const li = suggestionsWrapper.querySelector("li");
  const currentScroll = suggestions.scrollLeft;

  if (scroll === "left") {
    suggestions.scroll({
      left: currentScroll + li.offsetWidth * 2,
      behavior: "smooth",
    });
  } else {
    suggestions.scroll({
      left: currentScroll - li.offsetWidth * 2,
      behavior: "smooth",
    });
  }
}

export default suggestionsWrapper;
