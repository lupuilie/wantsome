const customerNameSpan = document.querySelector(".accounts .name");
export const editCustomerNameBtn = document.querySelector(
  ".accounts .edit-name"
);
export const setCustomerNameText = (name) => {
  customerNameSpan.textContent = name;
};

export const accountsListWrapper = document.querySelector(
  ".accounts .accounts-list"
);
export const addAccountBtn = document.querySelector(".accounts .btn");
export const emptyListP = document.querySelector(".accounts .empty-list");
export const accountsCard = document.querySelector(".accounts");
export const mainElement = document.querySelector("body > main");
