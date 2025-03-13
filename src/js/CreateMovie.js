const createMovieContainer = document.getElementById("createMovieContainer");
const postMovieEndpointUrl = "http://localhost:8080/api/v1/movie/create-movie"
function presentMovieForm() {
    let formDiv = document.createElement('div') // For the movie data
    //let imageUploadDiv = document.createElement('div') // For the image data

    //Hardcodede strings i Genre. Evt. ændre til at hente direkte fra backend?
    let movieForm = `
    <div class="createMovieContainer">
        <div class="createMovieContainer-left">
            <form id="movieFormData" action=${postMovieEndpointUrl} method="POST" enctype="multipart/form-data">
                <label for="movieTitle">Movie Title:</label>
                <input type="text" id="movieTitle" name="movieTitle">
                <br>
                
                <label for="movieDescription">Description:</label>
                <input type="text" id="movieDescription" name="movieDescription">
                <br>
                
                <label for="movieDuration">Duration in min:</label>
                <input type="number" id="durationInMin" name="durationInMin">
                <br>
                
                <label for="trailerLink">Trailer Link:</label>
                <input type="text" id="trailerLink" name="trailerLink">
                <br>
                
                <label for="reviewLink">Review Link:</label>
                <input type="text" id="reviewLink" name="reviewLink">
                <br>
                
                <label for="movieGenre">Genre:</label>
                <select id="movieGenre" name="Genre"> 
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
                </select>
                <br>
                
                <label for="ageRestriction">Age Restriction</label>
                <select id="ageRestriction" name ="ageRestriction">
                    <option value="PG_7">PG-7</option>
                    <option value="PG_12">PG-12</option>
                    <option value="PG_16">PG-16</option>
                    <option value="PG_18">PG-18</option>
                </select>
                <br>
            </div>
            <!-- Image Upload for the right side -->
            <div class="createMovieContainer-right">
                <label for="movieImageName">Image name:</label>
                <input type="text" id="movieImageName" name="image_name">
                <br>
                
                <label for="movieImage">Upload Image: </label>
                <input type="file" id="movieImage" name="image">
                <br>
                
                <label for="imageSaved">Image saved</label>
                <input type="date" id="imageSaved" name="saved">
                <br>
            </div>
                <button type="submit">Submit</button>
            </form>
    </div>
    `;
    formDiv.innerHTML = movieForm;
    createMovieContainer.appendChild(formDiv);
    console.log("Movie form added to dom")

    //POST to Backend
    const movieFormDataConst = document.getElementById("movieFormData")
    movieFormDataConst.addEventListener('submit', function(event) {
        event.preventDefault()
        console.log("Movie form data listener triggered")

        const formData = new FormData(movieFormDataConst)

        fetch(postMovieEndpointUrl, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch(error => console.error("Error", error))
    })
}
presentMovieForm()

