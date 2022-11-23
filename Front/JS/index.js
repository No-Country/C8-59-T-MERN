let allTrips = [];

fetch("JS/trips.json")
.then(res => res.json())
.then(data => {
    data.forEach(e => {
        allTrips.push(e)
    });
    showTrips(allTrips)
})


const cardContainer = document.querySelector(".card-container")



// Mostrar viajes

const showTrips = (miArray) => {
    cardContainer.innerHTML = "";

    miArray.forEach(el => {
        let cardDiv = document.createElement("div")
        cardDiv.className = "card-box";
        cardDiv.innerHTML = 
        `<div class="card" style="width: 18rem;">
            <img src=${el.img} class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${el.city}</h5>
                <p class="card-text">${el.country}</p>
            </div>
        </div>
        `
        
    cardContainer.appendChild(cardDiv);

    })
};