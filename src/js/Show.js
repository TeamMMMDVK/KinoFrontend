//console.log("Her er vi i Show script")
let movieIDFromStorage = localStorage.getItem("movieID")
let startDateFromStorage = sessionStorage.getItem("startDate");
let endDate = sessionStorage.getItem("endDate");
//console.log("FROM SHOW:",movieIDFromStorage, startDateFromStorage)

let redirect = "#booking"
const url = `http://localhost:8080/api/v1/show/${movieIDFromStorage}?startDate=${startDateFromStorage}&endDate=${endDate}` //TODO: Localstorage
let fetchSpecificUrl = `http://localhost:8080/api/v1/movie/${movieIDFromStorage}`

const showContainer = document.getElementById("showContainer")
const movieDetails = document.getElementById("movieDetails")
const btnNextPeriod = document.getElementById("more-shows")


async function fetchShows() {
    const data = await fetch(url);
    const response = await data.json();
    presentShows(response)
}

function presentShows(shows) {
    //Først opretter vi et tomt groupedShows objekt, hvori vi vil lave et array til hver dato, så tiderne kan gemmes
    // korrekt under disse
    const groupedShows = {};

    // Grupperer shows efter dato
    shows.forEach(show => {
        let date = show.startTime.split("T")[0];
        let time = show.startTime.split("T")[1];

        if (!groupedShows[date]) { //Hvis datoen ikke findes i vores groupedShows objekt, så oprettes et tomt array med datoen
            groupedShows[date] = [];
        }
        groupedShows[date].push({time, showID: show.showID, theaterID: show.theaterID });//Tilføjer tidspunkt, showID og theaterID til datoens array
    });

    showContainer.innerHTML = ""; // Ryd tidligere indhold i vores showContainer felt i html

    // Opret en div container til rækkerne
    let gridContainer = document.createElement("div");
    gridContainer.classList.add("shows-container");

    Object.keys(groupedShows).forEach(date => {
        let columnDiv = document.createElement("div");
        columnDiv.classList.add("show-column");

        let dateDiv = document.createElement("div");
        dateDiv.classList.add("show-date");
        dateDiv.innerHTML = date;

        columnDiv.appendChild(dateDiv);

        groupedShows[date].forEach(show => {
            let timeButton = document.createElement("button");
            timeButton.classList.add("show-time");
            timeButton.innerHTML = show.time;
            timeButton.addEventListener("click", () => {
                localStorage.setItem("showID", show.showID);
                localStorage.setItem("theaterID", show.theaterID)
                location.hash = redirect
                window.location.reload()
            });
            columnDiv.appendChild(timeButton);
        });

        gridContainer.appendChild(columnDiv);
    });

    showContainer.appendChild(gridContainer);



}

fetchShows()

async function fetchSpecificMovie() {
    const data = await fetch(fetchSpecificUrl);
    const response = await data.json();
    //console.log(response);
    //console.log(fetchSpecificUrl);
    presentMovie(response);
}

function presentMovie(movie) {
    localStorage.setItem("movieObj", JSON.stringify(movie))
    let headerTitle = document.querySelector("#show header h2")
    if(headerTitle) {
        headerTitle.innerText = movie.title  //sætter overskriften til filmens titel
    }


    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

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

    movieDiv.appendChild(moviePicture);
    movieDiv.appendChild(movieDescription);
    movieDiv.appendChild(trailerLink);
    movieDiv.appendChild(reviewLinks);

    movieDetails.appendChild(movieDiv);

}
fetchSpecificMovie()





