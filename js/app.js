let movies = []
function loadMovies() {
    fetch("data/movies.json")
        .then(response => response.json())
        .then(data => {
            movies.push(data);
            console.log(movies);
        });
}


function loadHome() {
    loadMovies()
    let app = document.getElementById("app");
    console.log(movies.name)
    app.innerHTML = `
        <h1>Welcome to Movie Portal</h1>
        <div id="movies-container"></div>
    `;
    let container = document.getElementById("movies-container");
    movies.forEach(movie => {
        let movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <img src="${movie.name}" alt="${movie.name}">
            <h3>${movie.name}</h3>
            <p>${movie.description}</p>
        `;
        container.appendChild(movieCard);
    });
}

function loadBooking(movieId, time) {
    let movie = movies.find(m => m.id === movieId);
    let app = document.getElementById("app");
    app.innerHTML = `
        <h1>Booking: ${movie.name}</h1>
        <p>Selected Time: <strong>${time}</strong></p>
        <div class="screen"></div>
        <div id="seats-container"></div>
        <button onclick="bookSeats()">Book Tickets</button>
    `;

    generateSeats();
}

// Load home initially
window.onload = loadHome;