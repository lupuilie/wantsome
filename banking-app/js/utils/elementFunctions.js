export function setDisabled(element) {
  if (element.nodeType !== Node.ELEMENT_NODE) return;

  element.setAttribute("disabled", true);
}

export function removeDisabled(element) {
  if (element.nodeType !== Node.ELEMENT_NODE) return;

  if (element.hasAttribute("disabled")) element.removeAttribute("disabled");
}
