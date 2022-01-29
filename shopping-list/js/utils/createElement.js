function createElement(
  tagname = "div",
  {
    id = null,
    className = null,
    textContent = null,
    src = null,
    alt = null,
  } = {}
) {
  const element = document.createElement(tagname);

  if (id) element.id = id;
  if (className) element.classList.add(...className.split(" "));
  if (textContent) element.textContent = textContent;
  if (src) element.src = src;
  if (alt) element.alt = alt;

  return element;
}

export default createElement;
