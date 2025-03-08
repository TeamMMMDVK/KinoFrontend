import booking from "./js/views/book.js";

const routes = {
  "/book": { title: "Booking", render: booking },
};

function router() {
  let view = routes[location.pathname];

  if (view) {
    document.title = view.title;
    app.innerHTML = view.render();
  } else {
    document.title = "404 Not Found";
    app.innerHTML = "<h1>404 - Page Not Found</h1>";
  }
}

window.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState("", "", e.target.href);
    router();
  }
});

window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);
