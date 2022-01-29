import createElement from "./createElement.js";

const materialIcon = (name, { className = null } = {}) => {
  return createElement("span", {
    className: `material-icons${className ? ` ${className}` : ""}`,
    textContent: name,
  });
};

export default materialIcon;
