function loadCSS(filename) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filename;
    document.head.appendChild(link);
}

loadCSS("css/success.css") // CSS fil indlæses når denne JS-fil kører


function showReservation(){
    const getInfoLocalStorage = JSON.parse(localStorage.getItem("successObj"))

    const resID = getInfoLocalStorage.reservationID //disse værdier kan vi hente direkte fra objektet
    const totalPrice = getInfoLocalStorage.totalPrice
    const resCustomerEmail = getInfoLocalStorage.customerEmail
    const resCustomer = getInfoLocalStorage.customerName
    const seatsInfo =[] //array til at gemme info om bookede sæder
    let movieTitle = ""
    let playTime = ""

    //bookedSeats er et array i objektet, som vi skal hente info fra, hvis der er poster
    if (getInfoLocalStorage.bookedSeats.length > 0){
        const firstSeat = getInfoLocalStorage.bookedSeats[0] //Jeg bruger første objekt i arrayet til at få fat på title og tid
        movieTitle = firstSeat.movieName
        playTime = firstSeat.startTime

        getInfoLocalStorage.bookedSeats.forEach( seat => { //Her iterere vi igennem tabellen for at få alle bookede sæder
            const seatNumber = seat.seatNumber
            const seatRow = seat.seatRow

            seatsInfo.push({seatNumber,seatRow})
        })
    } else {
        console.log("No booked seats found");
    }

    document.getElementById("resID").innerText = "ReservationID: " +resID
    document.getElementById("resMovieTitle").innerText = "Movie: " +movieTitle
    document.getElementById("resPlayTime").innerText = "StartTime: " +playTime

    const seatDetails = seatsInfo.map(seat =>`Row: ${seat.seatRow}, Seat: ${seat.seatNumber}`).join(', ');
    document.getElementById("resSeats").innerText = "Seats reserved: " +seatDetails
    document.getElementById("resTotalPrice").innerText = "Total price DKK: " +totalPrice
    document.getElementById("resCustomerEmail").innerText = "Email: " +resCustomerEmail


}
showReservation()
