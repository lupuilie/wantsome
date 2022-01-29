import User from "./services/User.js";

import accountViewerModule from "./components/account-viewer.js";
import transactionsViewerModule from "./components/transactions-viewer.js";

import {
  addAccountBtn,
  editCustomerNameBtn,
  setCustomerNameText,
} from "./elements.js";

import { editCustomerNameClick, addAccountClick } from "./interactions.js";

export const minTransactionAmount = 20;
export const welcomeBonus = 20;
export const customer = User("Lupu Ilie");
export const accountViewer = accountViewerModule();
export const primaryAccount = customer.getAccounts()[0];
export const transactionsViewer = transactionsViewerModule(primaryAccount);

setCustomerNameText(customer.getName());
accountViewer.viewAccounts();

/* Event Listeners */
editCustomerNameBtn.addEventListener("click", editCustomerNameClick);
addAccountBtn.addEventListener("click", addAccountClick);
