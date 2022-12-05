let allTrips = [];

fetch("JS/trips.json")
.then(res => res.json())
.then(data => {
    data.forEach(element => {
        allTrips.push(element)
    });
    showTrips(allTrips)
})

let cartShop = [];

const cardContainer = document.querySelector(".card-container");

const cartCounter = document.getElementById("cart-counter");
const totalPrice = document.getElementById("total-price")



// Mostrar viajes

const showTrips = (miArray) => {
    cardContainer.innerHTML = "";

    miArray.forEach(el => {
        let cardDiv = document.createElement("div")
        cardDiv.className = "card-box";
        cardDiv.innerHTML = 
        `<div class="card d-flex align-items-center" style="width: 16rem;" id="">
          <img src=${el.img} class="card-img-top rounded-4" style="width: 200px; margin-top: 20px;">
          <div class="card-body">
            <h4 class="card-title fw-bold">${el.city}</h4>
            <p class="card-text">${el.country}</p>
            <p class="card-text">Tipo de hospedaje: ${el.tipodehospedaje} <br> Descripcion: ${el.descripcion} <br> Comodidades:${el.comodidades}</p>
            <div class="d-flex justify-content-between">
              <p class="card-text fw-bolder">$${el.price}</p>
              <a id="agregar${el.id}" href="#" class="btn rounded-circle"><i class="bi bi-cart4 fs-2"></i></a>
            </div>
          </div>
        </div>
        `
        
        
    cardContainer.appendChild(cardDiv);

    // BOTON CARRITO

      let btnAdd = document.getElementById(`agregar${el.id}`)
      btnAdd.addEventListener("click", () => {
        addToCart(el.id);
      });

    });
};

// AGREGAR AL CARRITO

const addToCart = (id) => {
  let add = cartShop.find(e => e.id == id);
  if(add) {
    add.cantidad++
    document.getElementById(`und${agrego.id}`).innerHTML = `<p id = und${agrego.id}>Und:${agrego.cantidad}</p>`
    refreshCart();
  } else {
    let addTrip = allTrips.find(e => e.id == id);
    addTrip.cantidad = 1;
    cartShop.push(addTrip);
    refreshCart();
    showTrips(addTrip);
  }
}




// ACTUALIZAR CARRITO

const refreshCart = () => {
  cartCounter.innerText = [...cartShop].reduce((acc, el) => acc + el.cantidad, 0);
  totalPrice.innerText = [...cartShop].reduce((acc, el) => acc + (el.price * el.cantidad), 0);
}





//Buscador

/*document.addEventListener("keyup", e=>{

  if (e.target.matches("#search")){

      if (e.key === "Backspace"){destino.classList.add("filtro")};

      document.querySelectorAll("#viajes-search").forEach(destino =>{

          destino.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?destino.classList.remove("filtro")
            :destino.classList.add("filtro")
      }) 
           
  }
})*/
  
 

//Info para carrito de compras

