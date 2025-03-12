const showId = localStorage.getItem("showID");
const theaterId = localStorage.getItem("theaterID");
const bookingContainer = document.getElementById("bookingContainer");
const bookBtn = document.getElementById("book-button")
bookBtn.addEventListener("click", sendBooking)

const fetchSeatsUrl = `http://localhost:8080/api/v1/theater/${theaterId}/seats`;
const fetchBookedSeatsUrl = `http://localhost:8080/api/v1/bookedseat/show/${showId}`;
console.log(showId)

async function fetchSeatsInTheater() {
  const response = await fetch(fetchSeatsUrl);
  const seats = await response.json();

  let lastRow = 0;
  seats.forEach(seat => {
    if (seat.seatRow !== lastRow) {
      lastRow = seat.seatRow;
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("seat-row");

      const rowNumber = document.createElement("div");
      rowNumber.classList.add("row-number");
      rowNumber.innerHTML = `${seat.seatRow}`;
      rowDiv.appendChild(rowNumber);

      bookingContainer.appendChild(rowDiv);
    }

    const seatDiv = document.createElement("div");
    seatDiv.classList.add("seat", `row-${seat.seatRow}`, `col-${seat.seatNumber}`, `seatId-${seat.seatID}`);


    if (seat.blocked) {
      seatDiv.classList.add("blocked");
    } else {
      seatDiv.classList.add("available");

    }

    seatDiv.addEventListener("click", toggleSelected);

    bookingContainer.lastChild.appendChild(seatDiv);
  });
  fetchBookedSeats()
}


function toggleSelected() {
  this.classList.toggle("selected");
}

async function fetchBookedSeats() {
  const response = await fetch(fetchBookedSeatsUrl);
  const bookedSeats = await response.json();
  bookedSeats.forEach(seat => {
    const seatDiv = document.querySelector(`.seatId-${seat.seatID}`);
    if (seatDiv) {
      seatDiv.classList.remove("available");
      seatDiv.classList.add("booked");
    }
  });
}

function sendBooking() {
    const selectedSeats = document.querySelectorAll(".selected");
    const seatIDs = [];

    const customerName = document.getElementById("customerName").outerText
    const customerEmail = document.getElementById("customerEmail")
    const ticketId = document.getElementById("ticketId")


    selectedSeats.forEach(seat => {
        const seatID = seat.classList[3].split("seatId-")[1]
        seatIDs.push(seatID);
    });
    console.log("Selected seats:", seatIDs);

    const bookingUrl = `http://localhost:8080/api/v1/reservation`;
  console.log(bookingUrl)
    const bookingData = {
      customerName: customerName,
      customerEmail: customerEmail.innerText,
      showID: showId,
      seatsIDs: seatIDs,
      ticketIDs: [ticketId.innerText]
    };

  console.log(bookingData)

    fetch(bookingUrl, {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Success:", data);
                alert("Booking successful!");
                window.location.reload()
            } else {
                console.error("Error:", data);
                alert("Booking failed!");
            }
        })
}

function formForBooking(){
}

fetchSeatsInTheater()



