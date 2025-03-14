console.log("we are in revenue.js")

const allMoviesIdsUrl = `http://localhost:8080/api/v1/movie`;
// const salesAndRevenueUrl = `http://localhost:8080/api/v1/admin/movie/${id}/sales-revenue`

let revenueContainer = document.getElementById("revenueContainer")


async function fetchAllMoviesIds() {   //fetch IDs of all movies to then iterate over them
    const response = await fetch(allMoviesIdsUrl);
    const data = await response.json();
    console.log(data);
    return data;
}

async function fetchSalesAndRevenueForMovie(movieId) {  //fetches the data for a particular movie
    const response = await fetch(`http://localhost:8080/api/v1/admin/movie/${movieId}/sales-revenue`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Role": localStorage.getItem("Role")  //admin role is required by the backend
        }
    });
    const data = await response.json();
    console.log(data);
    return data;
}

async function fetchAllRevenue() { //iterates over all movies ids and fetches the revenue data for them
    const moviesIds = await fetchAllMoviesIds()
    const arrayOfPromises = moviesIds.map(id =>  //create all promises at once
        fetchSalesAndRevenueForMovie(id)
    )
    return await Promise.all(arrayOfPromises);  //waiting for all the movies to get fetched before returning
}

async function buildTableForAllMovies(revenues) {
    let tableRevenueAndSales = document.createElement("table")   //creating the table in html
    tableRevenueAndSales.classList.add("table")

    let tableHeader = document.createElement("tr");   //creating the header for the table
    let headers = ["Movie id", "Movie name", "Total revenue", "Number of tickets sold"]
    headers.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
    })
    tableRevenueAndSales.appendChild(tableHeader)


    revenues.forEach(movie => {   //populating the table
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        cell1.textContent = movie.movieID;
        row.appendChild(cell1);

        let cell2 = document.createElement("td");
        cell2.textContent = movie.movieTitle;
        row.appendChild(cell2);

        let cell3 = document.createElement("td");
        cell3.textContent = movie.revenue;
        row.appendChild(cell3);

        let cell4 = document.createElement("td");
        cell4.textContent = movie.soldTickets;
        row.appendChild(cell4);
        tableRevenueAndSales.appendChild(row);
    })
    revenueContainer.appendChild(tableRevenueAndSales)
}


async function main() {
    const allRevenue = await fetchAllRevenue();  //gets the data for all movies
    await buildTableForAllMovies(allRevenue);  //builds the table
}

main();