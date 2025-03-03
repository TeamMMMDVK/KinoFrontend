import { loadNavbar } from "../js/navbar.js";
loadNavbar();

// Dummy data - seat availability (true = available, false = unavailable)
const seatAvailability = [
    [true, true, false, true, true, true, true, false],

];

const seatsContainer = document.getElementById('seats-container');
const selectedSeats = [];
const movieSelect = document.getElementById('movie');
const countElement = document.getElementById('count');
const totalElement = document.getElementById('total');
const bookButton = document.getElementById('book-button');