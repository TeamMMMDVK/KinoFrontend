const createMovieContainer = document.getElementById("createMovieContainer");
const postMovieEndpointUrl = "localhost:8080/api/v1/movie/create-movie"
function presentMovieForm() {
    let formDiv = document.createElement('div') // For the movie data
    let imageUploadDiv = document.createElement('div') // For the image data

    //Hardcodede strings i Genre. Evt. ændre til at hente direkte fra backend?
    let movieForm = `
        <form action=${postMovieEndpointUrl} method="POST">
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
            
            <label for="">Title:</label>
            <input type="text" id="" name="">
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
            <button type="submit">Submit</button>
            </form>
    `;
    let imageUploadForm = `
        
    
    `;
}