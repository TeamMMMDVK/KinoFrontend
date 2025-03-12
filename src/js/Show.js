let movieIDFromStorage = localStorage.getItem("movieID")
let startDateFromStorage = sessionStorage.getItem("startDate");
let endDate = sessionStorage.getItem("endDate");
console.log("FROM SHOW:",movieIDFromStorage, startDateFromStorage)
let redirect = "#booking"
const url = `http://localhost:8080/api/v1/show/${movieIDFromStorage}?startDate=${startDateFromStorage}&endDate=${endDate}` //TODO: Localstorage
let fetchSpecificUrl = `http://localhost:8080/api/v1/movie/${movieIDFromStorage}`

const showContainer = document.getElementById("showContainer")

console.log("Show script")
async function fetchShows() {
    const data = await fetch(url);
    const response = await data.json();
    presentShows(response)
}
function presentShows(shows) {
    shows.forEach(show => {
        let showDiv = document.createElement("div");
        let showDateDiv = document.createElement("div");
        let showDate = document.createElement("p")
        let showTime = document.createElement("button") //TODO: CSS
        let showID = show.showID;
        let teaterID = show.theaterID;


        showDate.innerHTML = show.startTime.split("T")[0];
        showTime.innerHTML = show.startTime.split("T")[1];
        let bookShow = document.createElement("a")
        showDiv.classList.add("column")
        showDate.classList.add("column")
        bookShow.href = show.startTime

        showContainer.appendChild(showDiv);
        showContainer.appendChild(showDateDiv);
        showContainer.appendChild(bookShow);
        showDateDiv.appendChild(showDate)
        showDateDiv.appendChild(showTime)
        showTime.addEventListener('click',() => {
            localStorage.setItem("showID", showID)
            localStorage.setItem("theaterID", teaterID)
            console.log(teaterID)
            location.hash = redirect
            window.location.reload()
        })


    })
}

fetchShows()

async function fetchSpecificMovie() {
    const data = await fetch(fetchSpecificUrl);
    const response = await data.json();
    console.log(response);
    console.log(fetchSpecificUrl);
    presentMovie(response);
}

function presentMovie(movie) {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let movieTitle = document.createElement("h2");
    movieTitle.innerHTML = movie.title;

    let movieDescription = document.createElement("p");
    movieDescription.innerHTML = movie.description;

    let moviePicture = document.createElement("img");
    moviePicture.src = movie.image?.image || movie.image;

    let trailerLink = document.createElement("a");
    trailerLink.href = movie.trailerLink;
    trailerLink.innerHTML = "Watch Trailer";
    trailerLink.target = "_blank";

    let reviewLinks = document.createElement("a");
    reviewLinks.href = movie.reviewLink;
    reviewLinks.innerHTML = "Read Reviews";
    reviewLinks.target = "_blank";

    movieDiv.appendChild(movieTitle);
    movieDiv.appendChild(moviePicture);
    movieDiv.appendChild(movieDescription);
    movieDiv.appendChild(trailerLink);
    movieDiv.appendChild(reviewLinks);

    // Vores "hoveddiv" appendes til vores container i vores index.html
    showContainer.appendChild(movieDiv);
}

fetchSpecificMovie()



