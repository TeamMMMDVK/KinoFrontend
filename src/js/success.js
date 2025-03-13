function loadCSS(filename) {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = filename;
    document.head.appendChild(link);
}

loadCSS("css/success.css") // CSS fil indlæses når denne JS-fil kører

const getSuccessObj = localStorage.getItem("successObj")
const getContainer = document.getElementById("successContainer")


function showReservation(){
    let resDiv = document.createElement("div");
    let resText = document.createElement("p")
    resText.innerHTML = getSuccessObj

    resDiv.appendChild(resText)
    getContainer.appendChild(resDiv)
}

showReservation()
