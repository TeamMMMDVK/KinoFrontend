console.log("we are in admin.js")

let navigationContainer = document.getElementById("mainNavigation")
// let adminContainer = document.getElementById("adminContainer")
let role = localStorage.getItem("Role")

function cleanNavBar() {
    if (role === "ADMIN") {
        navigationContainer.innerHTML = "" //clean all the customer links

        let adminLink = document.createElement("a");
        adminLink.href = "#admin";
        adminLink.innerHTML = "Dashboard";
        adminLink.classList.add("view-link");
        navigationContainer.appendChild(adminLink)

        let revenueLink = document.createElement("a");
        revenueLink.href = "#revenue";
        revenueLink.innerHTML = "Revenue";
        revenueLink.classList.add("view-link");
        navigationContainer.appendChild(revenueLink)

        let createMovieLink = document.createElement("a");
        createMovieLink.href = "#create-movie";
        createMovieLink.innerHTML = "Add new movie";
        createMovieLink.classList.add("view-link");
        navigationContainer.appendChild(createMovieLink)

        let logoutLink = document.createElement("a");
        logoutLink.innerHTML = "Log out";
        logoutLink.classList.add("view-link");
        logoutLink.addEventListener('click', logout)
        navigationContainer.appendChild(logoutLink)
    }
}

function logout() {
    localStorage.removeItem("Role")
    location.hash = "#home"
    window.location.reload()
}

document.addEventListener("DOMContentLoaded", () => {
    cleanNavBar();
});