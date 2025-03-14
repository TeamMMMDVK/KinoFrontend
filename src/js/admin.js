console.log("we are in admin.js")

let navigationContainer = document.getElementById("mainNavigation")
// let adminContainer = document.getElementById("adminContainer")
let role = localStorage.getItem("Role")

const allMoviesUrl = `http://localhost:8080/api/v1/movie/all`;
let moviesTableContainer = document.getElementById("moviesTableContainer")


async function fetchAllMovies() {   //fetch IDs of all movies to then iterate over them
    const response = await fetch(allMoviesUrl);
    const data = await response.json();
    console.log(data);
    return data;
}


async function buildTableForAllMovies(movies) {
    let tableMovies = document.createElement("table")   //creating the table in html
    tableMovies.classList.add("table")

    let tableHeader = document.createElement("tr");   //creating the header for the table
    let headers = ["Movie id", "Movie title", "Age restriction", "Shows", "Edit", "Delete"]
    headers.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
    })
    tableMovies.appendChild(tableHeader)


    movies.forEach(movie => {   //populating the table
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        cell1.textContent = movie.movieID;
        row.appendChild(cell1);

        let cell2 = document.createElement("td");
        cell2.textContent = movie.title;
        row.appendChild(cell2);

        let cell3 = document.createElement("td");
        cell3.textContent = movie.ageRestriction;
        row.appendChild(cell3);

        let cell4 = document.createElement("td");
        let movieShowsLink = document.createElement("a");
        movieShowsLink.href = "#show";
        movieShowsLink.addEventListener('click', () => { //Vi skifter visning, når der trykkes på "buy ticket"
            localStorage.setItem("movieID", movie.movieID)
        } )
        movieShowsLink.innerHTML = "All shows";
        movieShowsLink.classList.add("view-link");
        cell4.appendChild(movieShowsLink)
        cell4.appendChild(document.createElement("br"))

        let addShowLink = document.createElement("a");
        addShowLink.href = "#create-show";
        addShowLink.addEventListener('click', () => { //Vi skifter visning, når der trykkes på "buy ticket"
            localStorage.setItem("movieID", movie.movieID)
        } )
        addShowLink.innerHTML = "Add new show";
        addShowLink.classList.add("view-link");
        addShowLink.addEventListener('click', () => { //Vi skifter visning, når der trykkes på "buy ticket"
            localStorage.setItem("movieID", movie.movieID)
        } )
        cell4.appendChild(addShowLink)
        row.appendChild(cell4);

        let cell5 = document.createElement("td");
        let updateMovieLink = document.createElement("a");
        updateMovieLink.href = "#update-movie";
        updateMovieLink.addEventListener('click', () => { //Vi skifter visning, når der trykkes på "buy ticket"
            localStorage.setItem("movieID", movie.movieID)
        } )
        updateMovieLink.innerHTML = "Update";
        updateMovieLink.classList.add("view-link");
        cell5.appendChild(updateMovieLink)
        row.appendChild(cell5);

        let cell6 = document.createElement("td");
        let deleteMovieLink = document.createElement("a");
        deleteMovieLink.href = "#show";
        deleteMovieLink.addEventListener('click', () => { //Vi skifter visning, når der trykkes på "buy ticket"
            localStorage.setItem("movieID", movie.movieID)
        } )
        deleteMovieLink.innerHTML = "Delete";
        deleteMovieLink.classList.add("view-link");
        cell6.appendChild(deleteMovieLink)
        row.appendChild(cell6);
        tableMovies.appendChild(row);
    })
    moviesTableContainer.appendChild(tableMovies)
}


async function main() {
    const allMovies = await fetchAllMovies();  //gets the data for all movies
    await buildTableForAllMovies(allMovies);  //builds the table
}



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
    main();
});