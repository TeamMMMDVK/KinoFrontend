export function loadNavbar() {
  fetch("/components/navbar.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("navbar-container").innerHTML = html;
    })
    .catch((error) => console.error("Error loading nav:", error));
}
