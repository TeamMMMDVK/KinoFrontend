const reservationInfo = JSON.parse(localStorage.getItem("successObj"))
const successContainer = document.getElementById("successContainer")


function showReservation(){
    let successDiv = document.createElement("div");

    const reservationId = document.getElementById("reservationID")
    successDiv.innerText = "Reservation ID: " + reservationInfo.reservationID

    const email = document.getElementById("email")
    email.innerText = "Email " + reservationInfo.customerEmail

    const totalPrice = document.getElementById("totalPrice")
    totalPrice.innerText = "Total price: " + reservationInfo.totalPrice

    const bookedSeats = document.getElementById("bookedSeats")
    bookedSeats.innerText = "Booked seats: " + reservationInfo.bookedSeats.map(seat => seat.seatNumber).join(", ");

    const theaterName = document.getElementById("theaterName")
    theaterName.innerText = "Theater name: " + reservationInfo.bookedSeats.map(theater => theater.theaterName)[0]

    const movie = document.getElementById("movie")
    movie.innerText = "Movie name: " + reservationInfo.bookedSeats.map(movie => movie.movieName)[0]

    const startTime = document.getElementById("startTime")
    startTime.innerText = "Start time: " + reservationInfo.bookedSeats.map(startTime => startTime.startTime)[0].split("T")[1]

    const ticketType = document.getElementById("ticketType")
    ticketType.innerText = "Ticket type: " + reservationInfo.bookedSeats.map(ticket => ticket.ticketType)[0]

    successDiv.appendChild(reservationId)

    successContainer.appendChild(successDiv)
}

showReservation()
