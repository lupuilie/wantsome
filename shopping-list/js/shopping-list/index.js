import { listRefresh, loadLocalStorage, onSubmitItem } from "./functions.js";
import { addItemForm, shoppingListElement } from "./elements.js";
import suggestions from "./suggestions.js";

/* App State */
export const shoppingLists = [
  {
    name: "Shopping list",
    items: [],
  },
];
export const currentViewing = 0;
export const maxItemsCount = 10;

/* Events */
addItemForm.addEventListener("submit", onSubmitItem);
// suggestionsWrapper.addEventListener("click", suggestionClick);

/* DOM Hydrate */
shoppingListElement.append(suggestions);
loadLocalStorage();
listRefresh();
