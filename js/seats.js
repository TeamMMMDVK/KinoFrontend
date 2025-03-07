const seatsContainer = document.getElementById('seats-container');
const movieSelect = document.getElementById('movie');
let countElement = document.getElementById('count');
let totalElement = document.getElementById('total');
const bookButton = document.getElementById('book-button');
let selectedSeats = [];

function fetchSeatsTheater() {
    return {
        seatRows: 8,
        seatColumns: 5,
        brokenSeats: [
            { row: 1, column: 2 },
            { row: 4, column: 2 },
            { row: 6, column: 3 }
        ]
    };
}

class Seat {
    constructor(row, column, isBooked = false, isBroken = false) {
        this.row = row;
        this.column = column;
        this.isBooked = isBooked;
        this.isBroken = isBroken;
    }
}

function renderSeatDiv(){

}
const { seatRows, seatColumns, brokenSeats } = fetchSeatsTheater();
const seatArray = [];

for (let row = 0; row < seatRows; row++) {
    for (let col = 0; col < seatColumns; col++) {
        const isBroken = brokenSeats.some(seat => seat.row === row && seat.column === col);
        seatArray.push(new Seat(row, col, false, isBroken));
    }
}

seatArray.forEach(seat => {
    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat", `row-${seat.row}`, `col-${seat.column}`);

    if (seat.isBroken) {
        seatDiv.classList.add("broken");
        seatDiv.textContent = "Broken";

    }

    seatsContainer.appendChild(seatDiv);
});

function updateSeatCount() {
    countElement.innerText = selectedSeats.length;
}

function toggleSelected(selectedSeat) {
    if (selectedSeat.target.classList.contains("selected")) {
        selectedSeat.target.classList.remove("selected");
    } else if (selectedSeat.target.classList.contains("broken"))
        alert("This seat is broken");
    else {
        selectedSeat.target.classList.add("selected");
        selectedSeats.push(selectedSeat.target);
    }
    updateSeatCount();
}


let seats = Array.from(document.getElementsByClassName("seat"))
for (const seat of seats) {
    seat.addEventListener("click", toggleSelected)

}

function bookSeats() {
    seats.forEach(seat => {

        if (seat.classList.contains("selected")) {
            seat.classList.remove("selected");
            seat.classList.add("booked");
            sentBookedSeatsToBackend()
        }
    });
}

//function sentBookedSeatsToBackend() {

//});

//console.log(bookedSeats);
//}
bookButton.addEventListener("click",bookSeats)

// get movie name and info
async function fetchAvailableMovies() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: "Inception", showtime: ["18:00-21:00"], theater: [2], showUUID: "550e8400-e29b-41d4-a716-446655440000" },
                { name: "KEA MOVIE", showtime: ["19:00-21:00"], theater: [1], showUUID: "550e8400-e29b-41d4-a716-446655440200" },
            ]);
        }, 1000);
    });
}

async function validateMovie() {
    const selectedMovie = new URLSearchParams(window.location.search).get("showUUID");

    const availableMovies = await fetchAvailableMovies();

    const movie = availableMovies.find(m => m.showUUID.toLowerCase() === selectedMovie.toLowerCase());

    if (movie) {
        document.getElementById("movie-title").innerText = "Movie: " + movie.name + " Showtime: " + movie.showtime + " Theater: " + movie.theater ;
    } else {
        alert("Invalid movie. Redirecting to home page...");
        window.location.href = "index.html";
    }
}




validateMovie();