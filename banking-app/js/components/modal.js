import createElement from "../utils/createElement.js";
import materialIcon from "../utils/materialIcon.js";
import { onSubmitAddAccount, transferSubmit } from "../interactions.js";
import { setCustomerNameText } from "../elements.js";
import { customer, minTransactionAmount } from "../script.js";
import { isLettersOnly, isDigitsOnly } from "../utils/inputValidations.js";
import { removeDisabled, setDisabled } from "../utils/elementFunctions.js";

function Modal() {
  const modalWrapper = createElement("div", { className: "modal-wrapper" });
  const modalContainer = createElement("div", {
    className: "modal container fadeIn",
  });
  const modalHeader = createElement("div", { className: "modal-header" });
  const modalCloseBtn = createElement("button", { className: "modal-close" });
  modalCloseBtn.append(materialIcon("close"));
  modalCloseBtn.addEventListener("click", closeModal);

  /* Edit user name _________*/
  function editUserName() {
    clearTextContent();

    const h4 = createElement("h4", {
      textContent: "Modifică numele de utilizator",
    });
    modalHeader.append(h4, modalCloseBtn);

    const form = createElement("form");
    const inputGroup = createElement("div", { className: "input-group" });
    const formControl = createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Introdu numele",
      autocomplete: "off",
      value: customer.getName(),
    });
    inputGroup.append(formControl);

    const saveBtn = createElement("button", {
      className: "btn bg-secondary modal-save",
      textContent: "Salvează",
    });

    form.append(inputGroup, saveBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (!isLettersOnly(formControl.value))
        return alert("Numele trebuie sa contina doar litere");
      if (formControl.value.length < 3)
        return alert("Numele trebuie sa contina minim 3 caractere");

      const input = formControl.value.trim();

      customer.changeName(input);
      setCustomerNameText(customer.getName());

      closeModal();
    });

    modalContainer.append(modalHeader, form);
    modalWrapper.append(modalContainer);

    document.body.append(modalWrapper);
    formControl.focus();
  }

  /* Edit user name _________*/
  function editAccount(account, setAccountName) {
    clearTextContent();

    const h4 = createElement("h4", {
      textContent: "Modifică numele contului",
    });
    modalHeader.append(h4, modalCloseBtn);

    const form = createElement("form");
    const inputGroup = createElement("div", { className: "input-group" });
    const formControl = createElement("input", {
      type: "text",
      className: "form-control",
      placeholder: "Introdu numele",
      autocomplete: "off",
      value: account.getName(),
    });
    inputGroup.append(formControl);

    const saveBtn = createElement("button", {
      className: "btn bg-secondary modal-save",
      textContent: "Salvează",
    });

    form.append(inputGroup, saveBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (formControl.value.length < 3)
        return alert("Numele trebuie sa contina minim 3 caractere");

      account.changeName(formControl.value.trim());
      setAccountName(account.getName());

      closeModal();
    });

    modalContainer.append(modalHeader, form);
    modalWrapper.append(modalContainer);

    document.body.append(modalWrapper);
    formControl.focus();
  }

  /* Add Account ____________*/
  function addAccount() {
    clearTextContent();

    const h4 = createElement("h4", { textContent: "Adaugă un cont" });
    modalHeader.append(h4, modalCloseBtn);

    const form = createElement("form");
    const inputGroup = createElement("div", { className: "input-group" });
    const label = createElement("label", {
      textContent: "Numele contului",
      forId: "modal-new-account",
    });
    const formControl = createElement("input", {
      type: "text",
      className: "form-control",
      id: "modal-new-account",
      autocomplete: "off",
      value: "",
    });

    inputGroup.append(formControl);

    const saveBtn = createElement("button", {
      className: "btn bg-secondary modal-save",
      textContent: "Salvează",
    });

    form.append(label, inputGroup, saveBtn);
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (formControl.value.length < 3)
        return alert("Numele trebuie sa contina minim 3 caractere");

      onSubmitAddAccount(formControl.value);
      closeModal();
    });

    modalContainer.append(modalHeader, form);
    modalWrapper.append(modalContainer);

    document.body.append(modalWrapper);
    formControl.focus();
  }

  /* Transfer ________*/
  function transfer(account) {
    clearTextContent();

    const h4 = createElement("h4", {
      textContent: "Transferă bani",
    });
    modalHeader.append(h4, modalCloseBtn);

    const form = createElement("form");
    const inlineGroup = createElement("div", { className: "inline-group" });

    const groupAmount = createElement("div", { className: "input-group" });
    const groupAmountLabel = createElement("label", {
      forId: "modal-transfer-amount",
      textContent: "Suma",
    });
    const inputAmount = createElement("input", {
      type: "number",
      className: "form-control text-right",
      placeholder: "Introdu suma",
      id: "modal-transfer-amount",
      value: "",
      autocomplete: "off",
    });
    groupAmount.append(groupAmountLabel, inputAmount);

    const groupSelectAccount = createElement("div", {
      className: "input-group",
    });
    const groupSelectAccountLabel = createElement("label", {
      forId: "modal-select-account",
      textContent: "În contul:",
    });
    const selectAccount = createElement("select", {
      id: "modal-select-account",
    });
    const accounts = customer.getAccounts();

    accounts.forEach((custAccount, accNum) => {
      const option = createElement("option", {
        textContent: custAccount.getName(),
        value: accNum,
      });
      if (account.getName() === custAccount.getName()) setDisabled(option);
      selectAccount.append(option);
    });
    groupSelectAccount.append(groupSelectAccountLabel, selectAccount);

    const transferBtn = createElement("button", {
      className: "btn bg-secondary modal-save",
      textContent: "Transferă",
    });
    setDisabled(transferBtn);

    inputAmount.addEventListener("keyup", () => {
      if (
        !isDigitsOnly(Number(inputAmount.value)) ||
        Number(inputAmount.value) > account.balance() ||
        Number(inputAmount.value) < minTransactionAmount
      ) {
        inputAmount.classList.add("invalid");
        setDisabled(transferBtn);
        return;
      }
      removeDisabled(transferBtn);
      inputAmount.classList.remove("invalid");
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        amount: Number(inputAmount.value),
        transferFrom: account,
        transferTo: accounts[selectAccount.value],
      };
      transferSubmit(data);
      closeModal();
    });

    inlineGroup.append(groupAmount, groupSelectAccount);
    const info = createElement("div", { className: "info" });
    info.append(materialIcon("info", { className: "md-18" }));
    info.append(
      createElement("small", {
        textContent: ` Suma minimă este de ${minTransactionAmount || 20} RON`,
      })
    );
    form.append(inlineGroup, info, transferBtn);

    modalContainer.append(modalHeader, form);
    modalWrapper.append(modalContainer);
    document.body.append(modalWrapper);
  }

  function closeModal() {
    modalWrapper.remove();
  }

  function clearTextContent() {
    modalContainer.textContent = "";
    modalHeader.textContent = "";
  }

  return {
    editUserName,
    editAccount,
    addAccount,
    transfer,
  };
}

export default Modal;
