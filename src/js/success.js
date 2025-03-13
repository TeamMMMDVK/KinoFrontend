const reservationInfo = JSON.parse(localStorage.getItem("successObj"))
const successContainer = document.getElementById("successContainer")


function showReservation(){
    let successDiv = document.createElement("div");

    const reservationId = document.createElement("p")
    reservationId.innerText = "Reservation ID: " + reservationInfo.reservationID

    const email = document.createElement("p")
    email.innerText = "Email " + reservationInfo.customerEmail

    const totalPrice = document.createElement("p")
    totalPrice.innerText = "Total price: " + reservationInfo.totalPrice

    const bookedSeats = document.createElement("p")
    bookedSeats.innerText = "Booked seats: " + reservationInfo.bookedSeats.map(seat => seat.seatNumber).join(", ");

    const theaterName = document.createElement("p")
    theaterName.innerText = "Theater name: " + reservationInfo.bookedSeats.map(theater => theater.theaterName)[0]

    const movie = document.createElement("p")
    movie.innerText = "Movie name: " + reservationInfo.bookedSeats.map(movie => movie.movieName)[0]

    const startTime = document.createElement("p")
    startTime.innerText = "Start time: " + reservationInfo.bookedSeats.map(startTime => startTime.startTime)[0].split("T")[1]

    const ticketType = document.createElement("p")
    ticketType.innerText = "Ticket type: " + reservationInfo.bookedSeats.map(ticket => ticket.ticketType)[0]

    successDiv.appendChild(reservationId)
    successDiv.appendChild(email)
    successDiv.appendChild(totalPrice)
    successDiv.appendChild(bookedSeats)
    successDiv.appendChild(theaterName)
    successDiv.appendChild(movie)
    successDiv.appendChild(startTime)
    successDiv.appendChild(ticketType)

    successContainer.appendChild(successDiv)
}

showReservation()
