const showId = localStorage.getItem("showID");
const theaterId = localStorage.getItem("theaterID");
const bookingContainer = document.getElementById("bookingContainer");


const fetchSeatsUrl = `http://localhost:8080/api/v1/theater/${theaterId}/seats`;
const fetchBookedSeatsUrl = `http://localhost:8080/api/v1/bookedseat/show/${showId}`;
console.log(showId)


async function fetchSeatsInTheater() {
  const response = await fetch(fetchSeatsUrl);
  const seats = await response.json();
  console.log("booking res", seats);

  let lastRow = 0;
  seats.forEach(seat => {
    if (seat.seatRow !== lastRow) {
      lastRow = seat.seatRow;
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("seat-row");

      // Create row number display
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
      seatDiv.innerHTML = "Broken";
    } else {
      seatDiv.classList.add("available");

    }

    seatDiv.addEventListener("click", toggleSelected);

    bookingContainer.lastChild.appendChild(seatDiv);
  });
}


function toggleSelected() {
  this.classList.toggle("selected");
}

async function fetchBookedSeats() {
  const response = await fetch(fetchBookedSeatsUrl);
  const bookedSeats = await response.json();
  console.log("Booked seats:", bookedSeats);
  bookedSeats.forEach(seat => {
    const seatDiv = document.querySelector(`.seatId-${seat.seatID}`);
    if (seatDiv) {
      console.log("Updating seat:", seat.seatID);
      seatDiv.classList.remove("available");
      seatDiv.classList.add("booked");
    }
  });


}

fetchSeatsInTheater()
fetchBookedSeats()



