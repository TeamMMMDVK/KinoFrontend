const seatsContainer = document.getElementById('seats-container');
const movieSelect = document.getElementById('movie');
const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');
const bookButton = document.getElementById('book-button');
const selectedSeats = [];

class Seat {
    constructor(row, column, isBooked) {
        this.row = row;
        this.colmn = column;
        this.isBooked = isBooked;
    }
}

const seatArray = []
for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 8; c++) {
        seatArray.push(new Seat(r, c, false))
    }
}
seatArray.forEach(seatArray => {

})


function renderPage(){
    renderSeats()
}
renderPage()