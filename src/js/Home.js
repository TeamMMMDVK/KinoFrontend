getDateRangeForEndpointUrl()
let todayFormatted = sessionStorage.getItem("startDate")
let futureFormatted = sessionStorage.getItem("endDate")

const url = `http://localhost:8080/api/v1/movie/inshow?startDate=${todayFormatted}&endDate=${futureFormatted}` //Normale endpoint uden params


let movieContainer = document.getElementById("movieContainer")
let redirect = "#show"
function getDateRangeForEndpointUrl() {
    let today = new Date(); //Vi danner url dynamisk med Date objekter, der kigger på dags dato og 7 dage ud i fremtiden.
    let futureDate = new Date();

    futureDate.setDate(today.getDate() + 7);

    let todayFormatted = today.toISOString().slice(0,-1);
    let futureFormatted = futureDate.toISOString().slice(0,-1); //Vi danner vores date objekter til rette format, så det kan accepteres som param. Slice -1 fjerner bare sidste char "Z"
    sessionStorage.setItem("startDate", todayFormatted); //Gemmer i session, så vi ikke gemmer DATETIME i længere tid end nødvendigt.
    sessionStorage.setItem("endDate", futureFormatted);

    //return `${url}?startDate=${todayFormatted}&endDate=${futureFormatted}` //Returnerer færdige URL
}

async function fetchMoviesInSpecificPeriod() {
    //let url = getDateRangeForEndpointUrl() //Henter dynamiske url
    try {
    const data = await fetch (url);
    const response = await data.json();

    iterateMovieList(response);
    }catch (error) {
        console.error(error)
    }

}
function iterateMovieList(movies) {

    movies.forEach(data => {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        let movieTitle = document.createElement("h2");
        movieTitle.innerHTML = data.title;

        let movieDescription = document.createElement("p");
        movieDescription.innerHTML = data.description;

        let moviePicture = document.createElement("img");
        moviePicture.src = data.image?.image || data.image;

        let trailerLink = document.createElement("a");
        trailerLink.href = data.trailerLink;
        trailerLink.innerHTML = "Watch Trailer";
        trailerLink.target = "_blank";

        let reviewLinks = document.createElement("a");
        reviewLinks.href = data.reviewLink;
        reviewLinks.innerHTML = "Read Reviews";
        reviewLinks.target = "_blank";

        let buyTicketButton = document.createElement("button")
        buyTicketButton.innerHTML = "Buy Ticket"
        buyTicketButton.href = redirect;

        buyTicketButton.addEventListener('click', () => { //Vi skifter visning, når der trykkes på "buy ticket"
            localStorage.setItem("movieID", data.movieID)
            location.hash = redirect
            window.location.reload()

        } )

        // Alt bliver tilføjet til vores "hoveddiv"
        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieDescription);
        movieDiv.appendChild(moviePicture);
        movieDiv.appendChild(trailerLink);
        movieDiv.appendChild(reviewLinks);
        movieDiv.appendChild(buyTicketButton)

        // Vores "hoveddiv" appendes til vores container i vores index.html
        movieContainer.appendChild(movieDiv);
    });
}


fetchMoviesInSpecificPeriod()
