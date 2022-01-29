import { customer, accountViewer, transactionsViewer } from "./script.js";
import BankAccount from "./services/BankAccount.js";
import Modal from "./components/modal.js";
import { setCustomerNameText } from "./elements.js";

const appModal = Modal();

export const addAccountClick = () => appModal.addAccount();
export function onSubmitAddAccount(userInput) {
  const id = customer.getAccounts().length;
  const newBankAccount = new BankAccount(userInput, id);
  customer.addAccount(newBankAccount);
  accountViewer.addToList(newBankAccount);
}

export const editCustomerNameClick = () => appModal.editUserName();
export const editAccountNameClick = (account, { edit }) =>
  appModal.editAccount(account, edit);

export const transferClick = (account) => appModal.transfer(account);
export const transferSubmit = ({ amount, transferFrom, transferTo }) => {
  transferFrom.transfer(amount, transferTo);
  accountViewer.update(transferFrom);
  accountViewer.update(transferTo);
  transactionsViewer.changeAccount(transferFrom);
};
export function appUpdate() {
  /* TODO: save customer info to localStorage  */
  console.log("appUpdate()");
}
