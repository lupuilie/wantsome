function createElement(
  tagname = "div",
  {
    id = null,
    className = null,
    textContent = null,
    href = null,
    type = null,
    src = null,
    alt = null,
    forId = null,
    placeholder = null,
    autocomplete = null,
    value = null,
  } = {}
) {
  const element = document.createElement(tagname);

  if (id) element.id = id;
  if (className) element.classList.add(...className.split(" "));
  if (textContent) element.textContent = textContent;
  if (href) element.setAttribute("href", href);
  if (type) element.type = type;
  if (src) element.src = src;
  if (alt) element.alt = alt;
  if (forId) element.setAttribute("for", forId);
  if (placeholder) element.setAttribute("placeholder", placeholder);
  if (autocomplete) element.setAttribute("autocomplete", autocomplete);
  if (value || value === 0) element.value = value;

  return element;
}

export default createElement;
