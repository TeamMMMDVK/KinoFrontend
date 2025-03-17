function loadCSS(filename) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filename;
    document.head.appendChild(link);
}

loadCSS("css/booking.css") // CSS fil indlæses når denne JS-fil kører


const showId = localStorage.getItem("showID");
const theaterId = localStorage.getItem("theaterID");
const bookingContainer = document.getElementById("bookingContainer");
const bookBtn = document.createElement("button")
bookBtn.id = "book-button"

bookBtn.addEventListener("click", sendBooking)

const fetchSeatsUrl = `http://localhost:8080/api/v1/theater/${theaterId}/seats`;
const fetchBookedSeatsUrl = `http://localhost:8080/api/v1/bookedseat/show/${showId}`;
const bookingUrl = `http://localhost:8080/api/v1/reservation`;

console.log(showId)



async function fetchSeatsInTheater() {
    const response = await fetch(fetchSeatsUrl);
    const seats = await response.json();

    const seatContainer = document.createElement("div");
    seatContainer.id = "seatContainer";

    const screenDiv = document.createElement("div");
    screenDiv.id = "screen";

    const screenLabel = document.createElement("p");
    screenLabel.id = "screen-label";
    screenLabel.innerText = "SCREEN";

    screenDiv.appendChild(screenLabel);
    seatContainer.appendChild(screenDiv);

    let lastRow = 0;

    seats.forEach(seat => {
        if (seat.seatRow !== lastRow) {
            lastRow = seat.seatRow;

            const rowDiv = document.createElement("div");
            rowDiv.classList.add("seat-row");

            const rowNumber = document.createElement("div");
            rowNumber.classList.add("row-number");
            rowNumber.innerText = `${seat.seatRow}`;

            rowDiv.appendChild(rowNumber);
            seatContainer.appendChild(rowDiv);
        }

        const seatDiv = document.createElement("div");
        seatDiv.classList.add("seat", `row-${seat.seatRow}`, `col-${seat.seatNumber}`, `seatId-${seat.seatID}`, `seatType-${1}`);

        if (seat.blocked) {
            seatDiv.classList.add("blocked");
        } else {
            seatDiv.classList.add("available");
        }

        seatDiv.addEventListener("click", toggleSelected);

        seatContainer.lastChild.appendChild(seatDiv);
    });

    bookingContainer.appendChild(seatContainer);
    fetchBookedSeats();
}



function toggleSelected() {
  this.classList.toggle("selected");
    calcSelectedSeats()
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

function sendBooking(event) { //event param contains info about click event. Its a event object.
    event.preventDefault() // Prevents form from reloading the page, because form default behavior is to reload page after form submit.
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
            console.log("success reloading")

        })
}


function generateBookingInfoPanel() {
    const getInfoLocalStorage = JSON.parse(localStorage.getItem("movieObj"));
    const showTime = localStorage.getItem("showTime")

    const bookingInfo = document.createElement("div");
    bookingInfo.id = "bookingInfo";
    bookingInfo.innerHTML = `
    <p>Movie: ${getInfoLocalStorage.title}</p>
    <p>Duration: ${getInfoLocalStorage.durationMin} minutes</p>
    <p>Show starts: ${showTime}</p>
    <p id="numOfSelectedSeats">Seats selected: 0</p>
    <p id="totalPrice">Total price: 0 kr</p>
    <form id="bookForm" action="" method="post">
      <label for="customerName">Name</label>
      <input type="text" name="customerName" id="customerName" required>
      <label for="customerEmail">Email</label>
      <input type="email" name="customerEmail" id="customerEmail" required>
      <button type="submit" class="button">Book</button>
    </form>
  `;

    bookingContainer.appendChild(bookingInfo);
    document.getElementById("bookForm").addEventListener("submit", sendBooking);
}

function calcSelectedSeats() {
    let totalSelectedSeats = document.getElementsByClassName("selected").length;
    document.getElementById("numOfSelectedSeats").innerText = "Seats selected: " + totalSelectedSeats;
    document.getElementById("totalPrice").innerText = "Total price: " + (100 * totalSelectedSeats) + " kr";

    return totalSelectedSeats;
}

function generateHeadline() {
    const getInfoLocalStorage = JSON.parse(localStorage.getItem("movieObj"))//Når et objekt er blevet gemt i localStorage
    //bliver det lagret som en string i JSON format. Derfor skal det hentes og parses tilbage inden vi kan hente data fra det
    const movieTitle = getInfoLocalStorage.title //Nu kan title hentes fra objektet
    const showDate = localStorage.getItem("showDate")
    const showStartTime = localStorage.getItem("showTime")
    const totalSelectedSeats = document.getElementsByClassName("selected").length
    console.log(totalSelectedSeats)

    console.log("showDate", showDate)
    console.log("showTime", showStartTime)

    let headerTitle = document.querySelector("#booking header h2")
    if(headerTitle) {
        headerTitle.innerText = `${movieTitle} - ${showDate} - ${showStartTime}`  //sætter overskriften til filmens titel, dato og valgt tid
    }

}

fetchSeatsInTheater()
generateBookingInfoPanel()
generateHeadline()



