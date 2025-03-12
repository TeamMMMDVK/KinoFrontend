//const url = "http://localhost:8080/api/v1/show/1?startDate=2025-03-10T14:30:00&endDate=2025-03-16T21:30:00"

let redirect = "#booking"

let movieIDFromStorage = localStorage.getItem("movieID")
const url = `http://localhost:8080/api/v1/show/${movieIDFromStorage}?startDate=2025-03-10T14:30:00&endDate=2025-03-16T21:30:00`

const movieUrl = `http://localhost:8080/api/v1/movie/${movieIDFromStorage}` //TODO: Localstorage
console.log("movieURL",movieUrl)
const showContainer = document.getElementById("showContainer")
//TODO: URL skal ændres til dynamiske værdier, ((movie ID, showID))

console.log("Show script")
async function fetchShows() {
    const data = await fetch(url);
    console.log("url",url)
    const response = await data.json();
    console.log("response",response)
    presentShows(response)
}
function presentShows(shows) {
    shows.forEach(show => {
        console.log(show)
        let showDiv = document.createElement("div");
/*
        let showTitle = document.createElement("div");
        let showTitleH2 = document.createElement("h2")
        showTitleH2.innerHTML = show.title;

 */
        let showDateDiv = document.createElement("div");
        let showDate = document.createElement("p")
        let showTime = document.createElement("button") //TODO: CSS
        let showID = show.showID;
        let teaterID = show.theaterID;


        showDate.innerHTML = show.startTime.split("T")[0];
        showTime.innerHTML = show.startTime.split("T")[1];
        console.log("log showdatetime", showDate)
        let bookShow = document.createElement("a")
        showDiv.classList.add("column")
        showDate.classList.add("column")
        bookShow.href = show.startTime

        console.log("bookShow HREF: ",bookShow.href)
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


async function fetchMovies() {
    const data = await fetch(movieUrl);
    const response = await data.json();
}


