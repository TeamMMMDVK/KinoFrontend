const showId = localStorage.getItem("showID");
const theaterId = localStorage.getItem("theaterID");
const bookingContainer = document.getElementById("bookingContainer");
const bookBtn = document.getElementById("book-button")
bookBtn.addEventListener("click", sendBooking)
let totalSelectedSeats = 0;

const fetchSeatsUrl = `http://localhost:8080/api/v1/theater/${theaterId}/seats`;
const fetchBookedSeatsUrl = `http://localhost:8080/api/v1/bookedseat/show/${showId}`;
console.log(showId)

async function fetchSeatsInTheater() {
  const response = await fetch(fetchSeatsUrl);
  const seats = await response.json()

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
    seatDiv.classList.add("seat", `row-${seat.seatRow}`, `col-${seat.seatNumber}`, `seatId-${seat.seatID}`, `seatType-${1}`);


    if (seat.blocked) {
      seatDiv.classList.add("blocked");
    } else {
      seatDiv.classList.add("available");

    }

    seatDiv.addEventListener("click", toggleSelected);



          bookingContainer.lastChild.appendChild(seatDiv);
  });
  fetchBookedSeats()
    generateBookingInfoPanel()

}


function toggleSelected() {
  this.classList.toggle("selected");
    generateBookingInfoPanel();
}

// Example: Attach event listener to elements with class "available"
document.querySelectorAll(".available").forEach(item => {
    item.addEventListener("click", toggleSelected);
})


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
    const seatTypes = []

    const customerName = document.getElementById("customerName")
    const customerEmail = document.getElementById("customerEmail")



    selectedSeats.forEach(seat => {
        const seatID = seat.classList[3].split("seatId-")[1]
        const seatType = seat.classList[4].split("seatType-")[1]
        seatIDs.push(seatID);
        seatTypes.push(seatType)
    });
    console.log("Selected seats:", seatIDs);

    const bookingUrl = `http://localhost:8080/api/v1/reservation`;
  console.log(bookingUrl)
    const bookingData = {
      customerName: customerName.value,
      customerEmail: customerEmail.value,
      showID: showId,
      seatsIDs: seatIDs,
      ticketIDs: seatTypes
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
            console.log(data)
           localStorage.setItem("successObj",JSON.stringify(data))
            location.hash = "#success"
            window.location.reload()
        })
}
function generateBookingInfoPanel() {
    const getInfoLocalStorage = JSON.parse(localStorage.getItem("movieObj"));
    const showTime = localStorage.getItem("showTime")
    const totalSelectedSeats = document.getElementsByClassName("selected").length
    console.log(totalSelectedSeats)

    document.getElementById("movieName").innerText = "Movie: " + (getInfoLocalStorage.title);
    document.getElementById("playtime").innerText = "Duration: " + (getInfoLocalStorage.durationMin) + " minutes";
    document.getElementById("date").innerText = "Show starts: " + showTime;
    document.getElementById("seats").innerText = "Seats selected: " + totalSelectedSeats;
    document.getElementById("price").innerText = "Total price: " + 100 * totalSelectedSeats + " kr";
}
fetchSeatsInTheater()


