const createShowContainer = document.getElementById("createShowContainer");
const fetchMoviesEndpointUrl = "http://localhost:8080/api/v1/movie/all";
const postShowEndpointUrl = "http://localhost:8080/api/v1/show/create-show";

function initShowFormAndSubmissionHandling() {
    presentShowForm();
    fetchMoviesAndPopulateDropdown();
}
initShowFormAndSubmissionHandling();

function presentShowForm() {
    let formDiv = document.createElement("div");
    let showForm = `
    <form id="showFormData" method="POST">
        <label for="movieSelect">Movie:</label>
        <select id="movieSelect" name="movieId" required>
            <option value="">Loading movies...</option>
        </select><br>

        <label for="showDate">Date:</label>
        <input type="date" id="showDate" name="showDate" required><br>

        <label for="showTime">Time:</label>
        <input type="time" id="showTime" name="showTime" required><br>

        <button type="submit" id="submitShowButton">Submit</button>
    </form>`;

    formDiv.innerHTML = showForm;
    createShowContainer.appendChild(formDiv);

    document.getElementById("showFormData").addEventListener("submit", submitShowForm);
}

async function fetchMoviesAndPopulateDropdown() {
    try {
        let response = await fetch(fetchMoviesEndpointUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        let movies = await response.json();

        let movieDropdown = document.getElementById("movieSelect");
        movieDropdown.innerHTML = "";

        movies.forEach(movie => {
            let option = document.createElement("option");
            option.value = movie.movieID;
            option.textContent = movie.title;
            movieDropdown.appendChild(option);
        });

    } catch (error) {
        console.error("Error fetching movies:", error);
        document.getElementById("movieSelect").innerHTML = `<option value="">Error loading movies</option>`;
    }
}

async function submitShowForm(event) {
    event.preventDefault();

    let showData = {
        movieID: document.getElementById("movieSelect").value,
        showDate: document.getElementById("showDate").value,
        showTime: document.getElementById("showTime").value
    };

    console.log("Submitting show:", showData);

    try {
        let response = await fetch(postShowEndpointUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(showData)
        });

        if (!response.ok) {
            throw new Error(`Server error! Status: ${response.status}`);
        }

        let data = await response.json();
        console.log("Server response:", data);
        alert("Show created successfully!");
    } catch (error) {
        console.error("Error creating show:", error);
        alert("Error creating show. Check console.");
    }
}
