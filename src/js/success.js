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
