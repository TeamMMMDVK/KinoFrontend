
/*
const createMovieContainer peger på en div ude i index.html med id "createMovieContainer"
const postMovieEndpointUrl er det endpoint som vi gerne vil kontakte i vores backend for at poste vores objekt fra frontend.
 */
const createMovieContainer = document.getElementById("createMovieContainer");
const postMovieEndpointUrl = "http://localhost:8080/api/v1/movie/create-movie";

function initMovieFormAndSubmissionHandling() {
    presentMovieForm()
    handleForm()
}
initMovieFormAndSubmissionHandling()

document.getElementById("movieImage").addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewDiv = document.getElementById("imagePreview");
            previewDiv.innerHTML = `<img src="${e.target.result}" alt="Image Preview" style="max-width:25%; height: auto;">`;
        };
        reader.readAsDataURL(file);
    } else {
        document.getElementById("imagePreview").innerHTML = `<p>No Image Selected</p>`
    }
})


function presentMovieForm() {
    let formDiv = document.createElement('div');
    //     <div class="createMovieContainer">
    let movieForm = `
    <form id="movieFormData" method="POST" enctype="multipart/form-data">
        <div class="createMovieContainer-left">
            <label for="movieTitle">Movie Title:</label>
            <input type="text" id="movieTitle" name="movieTitle" required><br>

            <label for="movieDescription">Description:</label>
            <input type="text" id="movieDescription" name="movieDescription" required><br>

            <label for="movieDuration">Duration in min:</label>
            <input type="number" id="durationInMin" name="durationInMin" required><br>

            <label for="trailerLink">Trailer Link:</label>
            <input type="text" id="trailerLink" name="trailerLink" required><br>

            <label for="reviewLink">Review Link:</label>
            <input type="text" id="reviewLink" name="reviewLink" required><br>

            <label for="movieGenre">Genre:</label>
            <select id="movieGenre" name="Genre" required>
                <option value="HORROR">Horror</option>
                <option value="DRAMA">Drama</option>
                <option value="ROMANCE">Romance</option>
                <option value="ACTION">Action</option>
                <option value="SCIENCE_FICTION">Science Fiction</option>
                <option value="THRILLER">Thriller</option>
                <option value="COMEDY">Comedy</option>
                <option value="DOCUMENTARY">Documentary</option>
                <option value="ANIMATION">Animation</option>
                <option value="MUSICAL">Musical</option>
            </select><br>

            <label for="ageRestriction">Age Restriction:</label>
            <select id="ageRestriction" name="ageRestriction" required>
                <option value="PG_7">PG-7</option>
                <option value="PG_12">PG-12</option>
                <option value="PG_16">PG-16</option>
                <option value="PG_18">PG-18</option>
            </select><br>
        </div>

        <div class="createMovieContainer-right">
            <label for="movieImageName">Image Name:</label>
            <input type="text" id="movieImageName" name="image_name" required><br>

            <label for="movieImage">Upload Image:</label>
            <input type="file" id="movieImage" name="image" required><br>

            <label for="imageSaved">Image Saved:</label>
            <input type="date" id="imageSaved" name="saved" required><br>
        </div>
        <div id="imagePreview" class="imagePreview">
            <p>No image selected.</p>
        </div>

        <!-- Submit button should be inside the form -->
        <button type="submit" id="submitButton">Submit</button> 
    </form>
</div>`;

    formDiv.innerHTML = movieForm;
    createMovieContainer.appendChild(formDiv);
}


function handleForm() {
    const movieFormDataConst = document.getElementById("movieFormData");
    const submitButtonConst = document.getElementById("submitButton")

    if (movieFormDataConst) {

        movieFormDataConst.addEventListener('submit', function (event) {
            event.preventDefault();

            let imageInput = document.getElementById("movieImage");
            let file = imageInput.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onloadend = function () {
                    let base64Image = reader.result //.split(",")[1];
                    let movieDataObj = {
                        title: document.getElementById('movieTitle').value,
                        durationMin: parseFloat(document.getElementById('durationInMin').value),
                        description: document.getElementById('movieDescription').value,
                        trailerLink: document.getElementById('trailerLink').value,
                        reviewLink: document.getElementById('reviewLink').value,
                        genre: document.getElementById('movieGenre').value,
                        ageRestriction: document.getElementById('ageRestriction').value,
                        image: {
                            name: document.getElementById('movieImageName').value,
                            image: base64Image,
                            saved: document.getElementById('imageSaved').value,
                        }
                    };

                    console.log(movieDataObj);
                    fetch(postMovieEndpointUrl, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify(movieDataObj),
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log("Server response:", data);
                            alert("Movie created successfully!");
                        })
                        .catch(error => {
                            console.error("Error uploading.", error);
                            alert("Error during upload. Check console.");
                        });
                };
                reader.readAsDataURL(file);
            } else {
                console.log("No file selected");
            }
        });
    }
}

