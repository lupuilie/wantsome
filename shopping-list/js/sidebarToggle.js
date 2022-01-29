import onClickOutside from "./utils/onClickOutside.js";

const sidebarToggler = document.querySelector(".sidebar-toggler");
const aside = document.querySelector("aside");
let asideVisible = false;

function openSidebar() {
  if (asideVisible) return;
  aside.style.transform = "none";
  aside.style.visibility = "visible";
  asideVisible = true;
}

function closeSidebar() {
  if (!asideVisible) return;

  aside.style.transform = "translateX(-100%)";
  // Aplicand 'hidden' animatia nu merge pana la capat, asa ca astept putin
  setTimeout(() => (aside.style.visibility = "hidden"), 300);
  asideVisible = false;
}

sidebarToggler.addEventListener("click", openSidebar);

onClickOutside(aside, closeSidebar, { ignore: sidebarToggler });
