/* Function to check if user click outside a 'target' element */
function onClickOutside(target, callback, options = { ignore: null }) {
  document.addEventListener("click", (e) => {
    if (options.ignore && options.ignore.contains(e.target)) {
      return;
    }
    const clickedInsideTarget = target.contains(e.target);
    if (!clickedInsideTarget) callback();
  });
}

export default onClickOutside;
