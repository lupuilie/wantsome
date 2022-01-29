import { transactionsViewer } from "../script.js";
import {
  accountsCard,
  addAccountBtn,
  accountsListWrapper,
  emptyListP,
} from "../elements.js";
import createElement from "../utils/createElement.js";
import materialIcon from "../utils/materialIcon.js";
import { customer, primaryAccount } from "../script.js";
import { editAccountNameClick, transferClick } from "../interactions.js";

function accountViewerModule() {
  let accountsList = accountsListWrapper;
  if (!accountsList) accountsList = createAccountsListElement();

  function createAccountsListElement() {
    const accountsList = createElement("div", { className: "accounts-list" });
    accountsCard.insertBefore(accountsList, addAccountBtn);
    return accountsList;
  }

  function createAccountHeading(account) {
    const h4 = createElement("h4");
    const span = createElement("span", { textContent: account.getName() });
    const changeAccountNameBtn = createElement("a", {
      href: "#",
      className: "edit-name",
    });
    changeAccountNameBtn.addEventListener("click", (e) => {
      e.preventDefault();
      editAccountNameClick(account, { edit });
    });
    changeAccountNameBtn.append(materialIcon("edit", { className: "md-18" }));
    h4.append(span, changeAccountNameBtn);

    function edit(newName) {
      span.textContent = newName;
    }
    return h4;
  }

  function createDetailsBtn(account) {
    const details = createElement("a");
    details.href = "#";
    details.append(materialIcon("trending_up"));
    details.append("Detalii");

    details.addEventListener("click", (e) => {
      e.preventDefault();
      detailsBtnHandler({ account });
    });
    return details;
  }

  function detailsBtnHandler({ account }) {
    transactionsViewer.changeAccount(account);
  }

  function createTransferBtn(account) {
    const transfer = createElement("a", { className: "transfer" });
    transfer.href = "#";
    transfer.append(materialIcon("payment"));
    transfer.append("Transfer");

    transfer.addEventListener("click", () => transferClick(account));
    return transfer;
  }

  /* Module Functions */

  function viewAccounts() {
    customer.getAccounts().forEach((account) => addToList(account));
  }

  function addToList(account) {
    // console.log(account);
    if (!account.getName || !account.balance) return;
    emptyListP.remove();

    const article = createElement("article", { className: "card-small" });
    const h4 = createAccountHeading(account);
    const p = createElement("p", { textContent: "Sold: " });
    const strong = createElement("strong", {
      textContent: `${account.balance()} RON`,
    });
    p.append(strong);

    const detailsBtn = createDetailsBtn(account);

    article.append(h4, p, detailsBtn);

    if (customer.getAccounts().length === 2) {
      const primaryAccountCard = accountsList.firstChild;
      const primaryAccountTransferBtn = createTransferBtn(primaryAccount);
      primaryAccountCard.append(primaryAccountTransferBtn);

      const transferBtn = createTransferBtn(account);
      article.append(transferBtn);
    }
    if (customer.getAccounts().length > 2) {
      const transferBtn = createTransferBtn(account);
      article.append(transferBtn);
    }

    /* Add to DOM */
    accountsList.append(article);
  }

  function update(account) {
    const accountCard = accountsList.childNodes[account.id];
    const balance = accountCard.querySelector("strong");
    balance.textContent = `${account.balance()} RON`;
  }

  return {
    viewAccounts,
    addToList,
    update,
  };
}

export default accountViewerModule;
