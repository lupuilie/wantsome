import BankAccount from "./BankAccount.js";
import { isLettersOnly } from "../utils/inputValidations.js";
import { welcomeBonus } from "../script.js";

function User(name = null) {
  let userName = name;
  const accounts = [];

  if (validateName(name) && accounts.length === 0) addPrimaryAccount();

  function addPrimaryAccount() {
    const newBankAccount = new BankAccount("Cont curent", 0);
    if (welcomeBonus > 0) newBankAccount.deposit(welcomeBonus);

    accounts.push(newBankAccount);
  }

  function validateName(name) {
    if (!isLettersOnly(name)) return false;

    return true;
  }

  function addAccount(newAccount) {
    accounts.push(newAccount);
  }

  function changeName(newName) {
    userName = newName;
  }

  function getName() {
    return userName;
  }

  function getAccounts() {
    return accounts;
  }

  return {
    addAccount,
    changeName,
    getName,
    getAccounts,
  };
}

export default User;
