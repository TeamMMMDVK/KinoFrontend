let movieIDFromStorage = localStorage.getItem("movieID")
let startDateFromStorage = sessionStorage.getItem("startDate");
let endDate = sessionStorage.getItem("endDate");
console.log("FROM SHOW:",movieIDFromStorage, startDateFromStorage)
let redirect = "#booking"
const url = `http://localhost:8080/api/v1/show/${movieIDFromStorage}?startDate=${startDateFromStorage}&endDate=${endDate}` //TODO: Localstorage


const showContainer = document.getElementById("showContainer")

console.log("Show script")
async function fetchShows() {
    const data = await fetch(url);
    //console.log("url",url)
    const response = await data.json();
    //console.log("response",response)
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


async function fetchMovies() {
    const data = await fetch(movieUrl);
    const response = await data.json();
}


