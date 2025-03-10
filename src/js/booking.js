console.log("Booking script");

let seatsContainer = document.getElementById("booking-container");
let countElement = document.getElementById("count");
let bookButton = document.getElementById("book-button");
let selectedSeats = [];

async function fetchSeatsTheater() {
  const response = await fetch("http://localhost:8080/api/v1/theater/1/seats");
  return response.json();
}

async function fetchBookedSeats() {
  const response = await fetch(
    "http://localhost:8080/api/v1/bookedseat/show/1"
  );
  return response.json();
}

async function renderSeatDiv() {
  if (!seatsContainer) return;
  const { totalAmountOfRows: seatRows, seatsPerRow: seatColumns } =
    await fetchSeatsTheater();
  const bookedSeats = await fetchBookedSeats();
  seatsContainer.innerHTML = "";

  for (let row = 0; row < seatRows; row++) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("seat-row");

    for (let col = 0; col < seatColumns; col++) {
      const seatDiv = document.createElement("div");
      seatDiv.classList.add("seat", `row-${row}`, `col-${col}`);

      const bookedSeat = bookedSeats.find(
        (seat) =>
          seat.seatRow === row &&
          seat.seatNumber === col &&
          seat.status === "BOOKED"
      );

      if (bookedSeat) {
        seatDiv.classList.add("booked");
        seatDiv.textContent = "Booked";
      }

      rowDiv.appendChild(seatDiv);
      seatDiv.addEventListener("click", toggleSelected);
    }
    seatsContainer.appendChild(rowDiv);
  }
}

function toggleSelected(event) {
  const seat = event.target;
  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter((s) => s !== seat);
  } else if (seat.classList.contains("booked")) {
    alert("This seat is already booked");
  } else {
    seat.classList.add("selected");
    selectedSeats.push(seat);
  }
  countElement.innerText = selectedSeats.length;
}

async function bookSeats() {
  const selectedSeatData = selectedSeats.map((seat) => {
    const row = parseInt(seat.classList[1].split("-")[1]);
    const column = parseInt(seat.classList[2].split("-")[1]);
    return { row, column };
  });

  const response = await fetch("http://localhost:8080/api/updateseats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ seats: selectedSeatData }),
  });

  if (response.ok) {
    selectedSeats.forEach((seat) => {
      seat.classList.remove("selected");
      seat.classList.add("booked");
    });
    selectedSeats = [];
    countElement.innerText = "0";
  } else {
    alert("Failed to book seats. Please try again.");
  }
}

if (bookButton) {
  bookButton.addEventListener("click", bookSeats);
}

renderSeatDiv();
