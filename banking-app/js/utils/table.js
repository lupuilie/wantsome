import createElement from "./createElement.js";

function tableMaker({ className = null, headers = null } = {}) {
  if (!headers) return console.log("tableMaker:headers[] not provided");

  const node = createElement("table", { className: className });
  const thead = createElement("thead");
  const theadRow = createElement("tr");

  headers.forEach((thText) => {
    const th = createElement("th", { textContent: thText });
    theadRow.append(th);
  });

  thead.append(theadRow);

  const tbody = createElement("tbody");
  node.append(thead, tbody);

  function setRows(transactions) {
    tbody.textContent = "";
    for (const transaction of transactions) {
      const tr = createElement("tr");
      for (const property in transaction) {
        tr.append(
          createElement("td", { textContent: `${transaction[property] || 0}` })
        );
      }
      tbody.append(tr);
    }
  }

  return {
    node,
    setRows
  };
}

export default tableMaker;
