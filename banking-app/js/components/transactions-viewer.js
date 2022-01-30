import createElement from "../utils/createElement.js";
import { isDigitsOnly } from "../utils/inputValidations.js";
import { removeDisabled, setDisabled } from "../utils/elementFunctions.js";
import tableMaker from "../utils/table.js";
import { mainElement } from "../elements.js";
import { accountViewer, minTransactionAmount } from "../script.js";

function transactionsViewerModule(account) {
  const detailedViewSection = document.querySelector(".detailed-view");
  const detailedView = !detailedViewSection
    ? createElement("section", {
        className: "detailed-view card",
      })
    : detailedViewSection;

  const header = detailedViewHeader(account);
  const transactions = transactionsHistory(account, detailedView);
  const form = detailedViewForm({
    account,
    header,
    accountViewer,
    transactions,
  });
  const minTransactionText = createElement("small", {
    textContent: `Suma minimă este de ${minTransactionAmount || 20} RON`,
  });

  detailedView.append(
    header.node,
    form.node,
    minTransactionText,
    transactions.node
  );
  mainElement.append(detailedView);

  /* Functions */
  function changeAccount(newAccount) {
    account = newAccount;
    header.changeAccount(account);
    form.changeAccount(account);
    if (account.getTransactions().length > 0) {
      transactions.changeAccount(account);
    } else {
      transactions.node.remove();
    }
  }

  function getAccountViewing() {
    return account;
  }

  return {
    changeAccount,
    getAccountViewing,
  };
}

/* header */
function detailedViewHeader(account) {
  const header = createElement("header");
  const h3 = createElement("h3", {
    textContent: account.getName(),
  });
  const p = createElement("p", { textContent: "Sold: " });
  const accountBalance = createElement("strong", {
    textContent: `${account.balance()} RON`,
  });
  p.append(accountBalance);

  header.append(h3, p);

  function changeAccount(account) {
    h3.textContent = account.getName();
    accountBalance.textContent = `${account.balance()} RON`;
  }

  return {
    node: header,
    changeAccount,
  };
}

/* form */
function detailedViewForm({ account, header, accountViewer, transactions }) {
  const form = createElement("form");
  const label = createElement("label", { textContent: "Actiuni cont" });
  const inputGroup = createElement("div", { className: "input-group" });
  const input = createElement("input", {
    className: "form-control",
    type: "number",
  });
  const depositBtn = createElement("button", {
    className: "btn bg-secondary",
    textContent: "Depune",
  });
  const withdrawBtn = createElement("button", {
    className: "btn bg-secondary",
    textContent: "Retrage",
  });

  inputGroup.append(input, depositBtn, withdrawBtn);
  form.append(label, inputGroup);

  /* State */
  let depositDisabled = true;
  let withdrawDisabled = true;
  let inputValue = Number(input.value);

  /* Form Event Listeners */
  form.addEventListener("submit", (e) => e.preventDefault());
  const inputChangeHandler = (e) => onInputChange(e.target.value);

  input.addEventListener("keyup", inputChangeHandler);
  input.addEventListener("change", inputChangeHandler);

  depositBtn.addEventListener("click", depositClick);
  withdrawBtn.addEventListener("click", withdrawClick);

  /* Form Functions */
  function onInputChange(inputNumber) {
    const value = Number(inputNumber);
    if (value < 0) input.value = 0;
    if (!isDigitsOnly(value) || value === 0 || value < minTransactionAmount) {
      input.classList.add("invalid");
      setDisabled(depositBtn);
      setDisabled(withdrawBtn);
      depositDisabled = true;
      withdrawDisabled = true;
      return;
    }
    if (value >= minTransactionAmount) {
      removeDisabled(depositBtn);
      depositDisabled = false;
    }
    if (value >= minTransactionAmount && value <= account.balance()) {
      removeDisabled(withdrawBtn);
      withdrawDisabled = false;
    } else {
      setDisabled(withdrawBtn);
      withdrawDisabled = true;
    }
    input.classList.remove("invalid");
    inputValue = value;
  }

  function depositClick() {
    if (depositDisabled) return;
    account.deposit(inputValue);
    header.changeAccount(account);

    input.value = "";
    onInputChange(0);
    input.classList.remove("invalid");
    accountViewer.update(account);
    transactions.changeAccount(account);
  }
  function withdrawClick() {
    if (withdrawDisabled) return;
    account.withdraw(inputValue);
    header.changeAccount(account);

    input.value = "";
    onInputChange(0);
    input.classList.remove("invalid");
    accountViewer.update(account);
    transactions.changeAccount(account);
  }

  function changeAccount(newAccount) {
    account = newAccount;
  }
  return {
    node: form,
    changeAccount,
  };
}

/* .transactions-history */
function transactionsHistory(account, detailedView) {
  const transactions = account.getTransactions();

  const wrapper =
    document.querySelector(".transactions-history") ||
    createElement("div", { className: "transactions-history" });
  wrapper.textContent = "";

  wrapper.append(createElement("h3", { textContent: "Istoric tranzactii" }));

  const tableHeaders = ["#", "Data", "Operatie", "Valoare", "Sold"];
  const transactionsTable = wrapper.querySelector(".transactions-table");
  if (transactionsTable) console.log(transactionsTable);

  const table = tableMaker({
    className: "transactions-table",
    headers: tableHeaders,
  });

  table.setRows(transactions);
  wrapper.append(table.node);

  function changeAccount(setAccount) {
    account = setAccount;

    if (transactions.length > 0) {
      detailedView.append(wrapper);
      table.setRows(account.getTransactions());
    }
  }

  return {
    node: wrapper,
    changeAccount,
  };
}

export default transactionsViewerModule;
