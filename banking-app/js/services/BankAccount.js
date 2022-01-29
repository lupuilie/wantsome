import dateFormat from "../utils/dateFormat.js";

function BankAccount(name = null, id = null) {
  let accountName = name;
  let amount = 0;
  let transactions = [];

  if (id !== null) this.id = id;

  this.getName = function () {
    return accountName;
  };

  this.changeName = function (newName) {
    accountName = newName;
  };

  this.receiveMoney = function (value, fromName) {
    amount += value;
    transactions.push(newTransaction({ type: `FROM:${fromName}`, value }));
  };

  this.deposit = function (value) {
    if (!value) return;
    amount += value;
    transactions.push(newTransaction({ type: "DEPOSIT", value }));
  };

  this.withdraw = function (value) {
    if (!value) return;
    amount -= value;
    transactions.push(newTransaction({ type: "WITHDRAW", value }));
  };

  this.transfer = function (value, account) {
    if (value > amount) return;
    amount -= value;
    account.receiveMoney(value, this.getName());
    transactions.push(
      newTransaction({
        type: `TO:${account.getName().substr(0, 10)}${
          account.getName().length > 10 ? "..." : ""
        }`,
        value,
      })
    );
  };

  this.balance = function () {
    return amount;
  };

  this.getTransactions = function () {
    return transactions;
  };

  function newTransaction({ date = null, type = null, value = null } = {}) {
    const transaction = {
      id: transactions.length + 1,
      date: dateFormat(),
      type,
      value: value || 0,
      balance: amount,
    };
    return transaction;
  }
}

export default BankAccount;
