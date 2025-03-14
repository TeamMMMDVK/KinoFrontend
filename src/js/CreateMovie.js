
/*
const createMovieContainer peger på en div ude i index.html med id "createMovieContainer"
const postMovieEndpointUrl er det endpoint som vi gerne vil kontakte i vores backend for at poste vores objekt fra frontend.
 */
const createMovieContainer = document.getElementById("createMovieContainer");
const postMovieEndpointUrl = "http://localhost:8080/api/v1/movie/create-movie";

/*
Denne funktion har bare til formål at starte de to nedenstående funktioner for "nemhedens skyld."
 */
function initMovieFormAndSubmissionHandling() {
    presentMovieForm()
    handleForm()
}
initMovieFormAndSubmissionHandling()
/*
Strukturen her er vigtig, da den overordnede startfunktion initMovieFormAndSubmissionHandling() bliver kaldt på linje 16,
så vores event listener på linje 23 kan først tilsluttes til det som den skal EFTER alle funktioner har kørt.
Denne listener lytter på 'change' begivenheder, eksempelvis når et input felt bliver fyldt. I dette tilfælde uploades
et billede i et input felt ved navn "movieImage". Når brugeren laver sin upload sker der en 'change'.
 */
document.getElementById("movieImage").addEventListener('change', function(event) {
    const file = event.target.files[0]; // Fil er lige med den fil, som påvirker changen. Uploadet billede trigger 'change'
    if (file) { //Hvis filen er 'god', eksisterer, ikke null etc. så fortsætter vi ind i if-blok.
        const reader = new FileReader();
        /*
        FileReader() er en API, der kan læse filer. I vores tilfælde så bruges den til at "læse" et uploadet billede og encoder det til en base64 streng(meget lang).
        reader.onload => når vores reader er klar skal den køre en funktion.
        const previewDiv => Vi fanger vores div, hvor vi gerne vil vise et preview af det uploadede billede.
         */
        reader.onload = function(e) {
            const previewDiv = document.getElementById("imagePreview");
            previewDiv.innerHTML = `<img src="${e.target.result}" alt="Image Preview" style="max-width:25%; height: auto;">`;
            //Vi fortæller bare previewDiv at den skal indeholde et billede med embedded styling, så billedet ikke fylder hele skærmen. Det skal jo bare være et preview.
        };
        reader.readAsDataURL(file);
        /*
        Hvis man holder sin mus over .readAsDataURL kan man få lidt mere information om hvad den gør, men det er her,
        hvor FileReader "læser" filen.
         */
    } else {
        document.getElementById("imagePreview").innerHTML = `<p>No Image Selected</p>`
        //Hvis der ikke er uploadet eller valgt noget billede, så kan brugeren se det.
    }
})


function presentMovieForm() {
    let formDiv = document.createElement('div'); //Overordnet div
    /*
    Nedenfor bruger vi "template literals". Det er brugen af backticks(`, ``). Template literals gør det muligt for os
    at indsætte værdier direkte ind i en streng, lidt ligesom vi gjorde med Thymeleaf. En forbedring her til kunne være
    at i stedet for hardcode af de forskellige genre så kunne vi kontakte et backend endpoint for at hive fat i valide genre
    som findes i backend enum klassen Genre. Så kunne man indsætte det med placeholder syntaks sådan: ${placeholder}
     I dette tilfælde så bruger vi det til at dynamisk generere html, så det bliver renderet, når brugeren bevæger sig hen på den nærværende side.
    Ellers er det bare almindeligt html med input felter.
     */

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

    formDiv.innerHTML = movieForm; //Vi indsætter formularen indeni formDiv, som vi definerede som det første.
    createMovieContainer.appendChild(formDiv); //formDiv bliver tillagt vores movieContainer div, der er defineret ude i index.html.
}


function handleForm() {
    /*
    const movieFormDataConst peger på det id som den ovenstående form har. <form id="movieFormData" method="POST" enctype="multipart/form-data">, linje 61.
     */
    const movieFormDataConst = document.getElementById("movieFormData");
    //const submitButtonConst = document.getElementById("submitButton")

    if (movieFormDataConst) { //Hvis det enkelte element findes så fortsætter vi i if-blok.
        /*
        Denne del kunne sagtens være i ovenstående metode, der er ikke et behov for at udskille de to elementer.
        Men denne metode har til hensigt at håndtere det scenarie, hvor brugeren trykker på "submit" knappen.
        Listener typen her er submit i modsætning til click, da knappen befinder sig indeni en form.
        event skal forstås som hvad der sker, når typen bliver triggered. Så med event.preventDefault() vil vi selv definere,
        hvad der skal ske, når brugeren trykker på submit.
         */
        movieFormDataConst.addEventListener('submit', function (event) {
            event.preventDefault();

            let imageInput = document.getElementById("movieImage");
            //Samme som ved imagePreview listener. Vi finder elementet fra vores (dynamiske) html og peger på det.
            //Vi tjekker derefter, hvilke filer der befinder sig i det element.
            let file = imageInput.files[0];
            //Jeg tror grunden til, at vi skal bruge indeksering [], det er fordi input type=file, og det kan lidt forskelligt. Blandt andet håndtere flere filer.
            if (file) {
                let reader = new FileReader();
                reader.onloadend = function () {
                    /*
                    Samme som ved imagePreview, men .onloadend bliver først triggered,
                    når reader.readAsDataURL(file) har læst filen på linje 187.
                     */
                    let base64Image = reader.result //Vi får vores encoded billede, når FileReader har læst færdigt og gemmer det i en variabel.
                    let movieDataObj = { //Det endelige objekt vi sender videre til vores endpoint. Key-Value pairs ligesom i Postman.
                        title: document.getElementById('movieTitle').value, //Vi bruger .value, når vi har at gøre med input felter i en form.
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

                    //console.log(movieDataObj);
                    fetch(postMovieEndpointUrl, { //Vi kontakter vores endpoint
                        method: "POST",
                        headers: { 'Content-Type': 'application/json; charset=utf-8' },
                        body: JSON.stringify(movieDataObj), //og POSTER vores objekt. JSON.stringify konverterer vores
                        // JavaScript objekter til en streng i JSON-format, der kan læses af vores backend API.
                    })
                        .then(response => response.json()) //fetch returnerer et promise, der efterfølgende bliver resolved i vores .then.
                        //Vi kunne undvære vores .then, men så kan vi ikke tjekke, hvad vores backend sender tilbage,
                        // hvilket vil gøre fejlfinding lidt mere besværligt.
                        .then(data => {
                            console.log("Server response:", data);
                            alert("Movie created successfully!");
                        })
                        .catch(error => {
                            console.error("Error uploading.", error);
                            alert("Error during upload. Check console.");
                        });
                };
                reader.readAsDataURL(file); //Når denne linje er færdigt bevæger vi os "op" for at fuldføre den kode,
                //der sker ved reader.onloadend = function () { ved linje 150.
            } else {
                console.log("No file selected");
            }
        });
    }
}

