console.log("we are in admin.js")

let navigationContainer = document.getElementById("mainNavigation")
console.log(navigationContainer)
let role = localStorage.getItem("Role")

function cleanNavBar(){
    if(role === "ADMIN"){
        navigationContainer.innerHTML = ""
        // let adminNavDiv = document.createElement("div");

        let revenueLink = document.createElement("a");
        revenueLink.href = "#revenue";
        revenueLink.innerHTML = "Revenue";
        revenueLink.target = "_blank";
        revenueLink.classList.add("view-link");
        // adminNavDiv.appendChild(revenueLink);
        navigationContainer.appendChild(revenueLink)
        const currentHash = location.hash;
        location.hash = "";         // Temporarily clear the hash
        location.hash = currentHash;

    }

}
document.addEventListener("DOMContentLoaded", () => {
    cleanNavBar();
});