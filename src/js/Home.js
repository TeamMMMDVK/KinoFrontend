//const url = "http://localhost:8080/api/v1/movie/inshow?startDate=2025-03-10T14:30:00&endDate=2025-03-16T22:30:00";
const url = "http://localhost:8080/api/v1/movie/inshow?startDate=2025-03-10T14:30:00&endDate=2025-03-16T22:30:00";
console.log(url); //TODO: Ret url med Date objekt.
let movieTitle = document.getElementById("movieTitle")
let movieDescription = document.getElementById("movieDescription")
let moviePicture = document.getElementById("moviePicture")
let trailerLink = document.getElementById("trailerLink")
let anmeldelserLink = document.getElementById("anmeldelserLink")
let movieContainer = document.getElementById("movieContainer")
let redirect = "#show"
function getDateRange() {
    let today = new Date();
    let futureDate = new Date();

    futureDate.setDate(today.getDate() + 7); // Add 7 days to today

    // Format dates as YYYY-MM-DD
    let todayFormatted = today.toISOString();
    let futureFormatted = futureDate.toISOString();

    console.log({ today: todayFormatted, future: futureFormatted }) ;
    console.log(today.getTime())

}
async function fetchMoviesInSpecificPeriod() {
    const data = await fetch (url);
    const response = await data.json();
    iterateMovieList(response);
    console.log(response)
}
function iterateMovieList(movies) {
    console.log("size", movies.length)
    movies.forEach(data => {
        let movieDiv = document.createElement("div");
        movieDiv.classList.add("movie");

        let movieTitle = document.createElement("h2");
        movieTitle.innerHTML = data.title;

        let movieDescription = document.createElement("p");
        movieDescription.innerHTML = data.description;

        let moviePicture = document.createElement("img");
        moviePicture.src = data.image?.image || data.image; // Ensure correct path

        let trailerLink = document.createElement("a");
        trailerLink.href = data.trailerLink;
        trailerLink.innerHTML = "Watch Trailer";
        trailerLink.target = "_blank";

        let anmeldelserLink = document.createElement("a");
        anmeldelserLink.href = data.reviewLink;
        anmeldelserLink.innerHTML = "Read Reviews";
        anmeldelserLink.target = "_blank";

        let buyTicketButton = document.createElement("button")
        buyTicketButton.innerHTML = "Buy Ticket"
        buyTicketButton.href = redirect;
        console.log("REDIRECT HREF:",redirect)
        buyTicketButton.addEventListener('click', () => {
            localStorage.setItem("movieID", data.movieID)
            location.hash = redirect
            window.location.reload()

        } )

        // Append elements to the movie div
        movieDiv.appendChild(movieTitle);
        movieDiv.appendChild(movieDescription);
        movieDiv.appendChild(moviePicture);
        movieDiv.appendChild(trailerLink);
        movieDiv.appendChild(anmeldelserLink);
        movieDiv.appendChild(buyTicketButton)

        // Append movieDiv to the movieContainer
        movieContainer.appendChild(movieDiv);
    });



    /*
   movies.forEach(data => {

       movieTitle.innerHTML = data.title;
       movieDescription.innerHTML = data.description
       moviePicture.src = data.image.image
       trailerLink.innerHTML = data.trailerLink
       anmeldelserLink.innerHTML = data.reviewLink
       let movieDiv = document.createElement("div")
       movieDiv.classList.add("movie")
       movieContainer.appendChild(movieDiv)
   })

     */
}


fetchMoviesInSpecificPeriod()