console.log("We are in movies.js")


let movies = []
const urlMovies = "../data/movies.json"

let moviesContainer = document.getElementById("movies-container")
console.log(moviesContainer)

function loadMovies() {
    return fetchMovies()
}

async function fetchAnyUrl(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error(`Response status ${response.status}`);
        }
    } catch (error) {
        alert(error.message);
        console.error(error);
    }

}

async function fetchMovies() {
    movies = await fetchAnyUrl(urlMovies);
    console.log(movies)
    movies.forEach(addMoviesToPage)
}

function addMoviesToPage(movie) {
    console.log("we are in add movies to page")
    let newElement = document.createElement("div");
    newElement.className = "movie";
    console.log(newElement)
    newElement.innerHTML = `
    <h2>${movie.title}</h2>
    <a href="http://localhost:8080/movies/${movie.id}">Buy ticket</a>`

    moviesContainer.appendChild(newElement);
}

export {loadMovies}

