//console.log("Router script");

function initializeViewNavigation() {
  window.addEventListener("hashchange", handleViewChange);
  handleViewChange(); // set initial view
}

function handleViewChange() {
  let defaultView = "#home"; // default view

  if (location.hash) {
    defaultView = location.hash; // extract the hash from the URL
  }

  hideAllViews();

  // Set the selected view to active
  document.querySelector(defaultView).classList.add("active");
  updateNavbarActiveLink(defaultView); // update active link in navbar
}

function updateNavbarActiveLink(view) {
  // Set the corresponding navbar link to active
  const navbarLink = document.querySelector(`a.view-link[href="${view}"]`); // Get navbar element with href equal to view
  if (navbarLink) {
    navbarLink.classList.add("active"); // Add active class to the navbar element
    loadSectionScript(view)
  }
}
function loadSectionScript(view) {
  const scriptMapping = {
    "#home": "js/home.js",
    "#show": "js/show.js",
    "#booking": "js/booking.js",
    "#success": "js/success.js",
    "#create-movie": "js/CreateMovie.js",
    "#revenue": "js/revenue.js",
    "#admin": "js/admin.js",
    "#create-show": "js/createShow.js"
  };

  if (scriptMapping[view]) {
    import(`./${scriptMapping[view]}`)
        .then(() => console.log(`Loaded script for ${view}`))
        .catch(err => console.error(`Error loading script for ${view}:`, err));
  }
}

function hideAllViews() {
  // Remove 'active' class from all views and nav links
  document
    .querySelectorAll(".view-content")
    .forEach((content) => content.classList.remove("active"));
  document
    .querySelectorAll(".view-link")
    .forEach((link) => link.classList.remove("active"));
}

export { initializeViewNavigation };
