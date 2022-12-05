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
        `<div id="viajes-search" class="container">
        <div class="row">
          <div class="col-sm-9 col-md-9 col-lg-9">
            <div class="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex">
              <div class="hotel-card_images">
                <div id="bootstrapCarousel" class="carousel slide h-100" data-ride="carousel">
                  <div class="carousel-inner h-100">
                    <div class="carousel-item h-100 active">
                      <img src="images/hotel1.jpg" class="d-block w-100" alt="Hotel Image">
                    </div>
                    <div class="carousel-item h-100">
                      <img src="images/hotel2.jpg" class="d-block w-100" alt="Hotel Image">
                    </div>
                    <div class="carousel-item h-100">
                      <img src="images/hotel3.jpg" class="d-block w-100" alt="Hotel Image">
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#bootstrapCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#bootstrapCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              </div>
              <div class="hotel-card_info p-4">
                <div class="d-flex align-items-center mb-2">
                  <h5 class="mb-0 mr-2">Hotel Paradise</h5>
                  <div>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                    <i class="fa fa-star text-warning"></i>
                  </div>
                  <a href="#!" class="text-dark ml-auto"><i class="far fa-heart fa-lg"></i></a>
                </div>
                <div class="d-flex justify-content-between align-items-end">
                  <div class="hotel-card_details">
                    <div class="text-muted mb-2"><i class="fas fa-map-marker-alt"></i> ${el.city} +", "+${el.country}</div>
                    <div class="mb-2"><span class="badge badge-primary">4.5</span> <a href="#!" class="text-muted">(245 ratings & 56 reviews)</a></div>
                    <div class="amnities d-flex mb-3">
                      <img class="mr-2" src="images/icons/desk-bell.svg" data-toggle="tooltip" data-placement="top" title="Desk bell" alt="Desk bell">
                      <img class="mr-2" src="images/icons/single-bed.svg" data-toggle="tooltip" data-placement="top" title="Single Bed" alt="Single Bed">
                      <img class="mr-2" src="images/icons/towels.svg" data-toggle="tooltip" data-placement="top" title="Towels" alt="Towels">
                      <img class="mr-2" src="images/icons/wifi.svg" data-toggle="tooltip" data-placement="top" title="Wifi" alt="Wifi">
                    </div>
                    <ul class="hotel-checklist pl-0 mb-0">
                      <li><i class="fa fa-check text-success"></i> Lorem ipsum dolor</li>
                      <li><i class="fa fa-check text-success"></i> Cras lectus purus, </li>
                      <li><i class="fa fa-check text-success"></i> ornare eget congue</li>
                    </ul>
                  </div>
                  <div class="hotel-card_pricing text-center">
                    <h3>$ ${el.price}</h3>
                    <div class="d-flex">
                       <h6 class="text-striked text-muted mr-2">₹1,999</h6>
                       <h6 class="text-success">32% off</h6>
                    </div>
                    <button class="btn btn-primary">Check Rooms</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
    </script>
  </body>
  </html>
  
  
  
  
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
          <link rel="stylesheet" href="/Front/Recursos/Cards/css/style.css">
          
          <div id="viajes-search" class="main-content container filtro">
            <div class="row">
              <div class="col-sm-9 col-md-9 col-lg-9">
                <div class="hotel-card bg-white rounded-lg shadow overflow-hidden d-block d-lg-flex">
                  <div class="hotel-card_images">
                    <div id="bootstrapCarousel" class="carousel slide h-100" data-ride="carousel">
                      <div class="carousel-inner h-100">
                        <div class="carousel-item h-100 active">
                          <img src="${el.img}" class="d-block w-100" alt="Hotel Image">
                        </div>
                        <div class="carousel-item h-100">
                          <img src="${el.img2}" class="d-block w-100" alt="Hotel Image">
                        </div>
                        <div class="carousel-item h-100">
                          <img src="${el.img3}" class="d-block w-100" alt="Hotel Image">
                        </div>
                      </div>
                      <a class="carousel-control-prev" href="#bootstrapCarousel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                      </a>
                      <a class="carousel-control-next" href="#bootstrapCarousel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                      </a>
                    </div>
                  </div>
                  <div class="hotel-card_info p-4">
                    <div class="d-flex align-items-center mb-2">
                      <h5 class="mb-0 mr-2">Hotel Paradise</h5>
                      <div>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                        <i class="fa fa-star text-warning"></i>
                      </div>
                      <a href="#!" class="text-dark ml-auto"><i class="far fa-heart fa-lg"></i></a>
                    </div>
                    <div class="d-flex justify-content-between align-items-end">
                      <div class="hotel-card_details">
                        <div "class="text-muted mb-2"><i class="fas fa-map-marker-alt"></i> ${el.city}, ${el.country}</div>
                        <div class="mb-2"><span class="badge badge-primary">4.5</span> <a href="#!" class="text-muted">(245 ratings & 56 reviews)</a></div>
                        <div class="amnities d-flex mb-3">
                          <img class="mr-2" src="/Front/Recursos/Cards/icons/desk-bell.svg" data-toggle="tooltip" data-placement="top" title="Desk bell" alt="Desk bell">
                          <img class="mr-2" src="/Front/Recursos/Cards/icons/single-bed.svg" data-toggle="tooltip" data-placement="top" title="Single Bed" alt="Single Bed">
                          <img class="mr-2" src="/Front/Recursos/Cards/icons/towels.svg" data-toggle="tooltip" data-placement="top" title="Towels" alt="Towels">
                          <img class="mr-2" src="/Front/Recursos/Cards/icons/wifi.svg" data-toggle="tooltip" data-placement="top" title="Wifi" alt="Wifi">
                        </div>
                        <ul class="hotel-checklist pl-0 mb-0">
                          <li><i class="fa fa-check text-success"></i> Lorem ipsum dolor</li>
                          <li><i class="fa fa-check text-success"></i> Cras lectus purus, </li>
                          <li><i class="fa fa-check text-success"></i> ornare eget congue</li>
                        </ul>
                      </div>
                      <div class="hotel-card_pricing text-center">
                        <h3>$ ${el.price}</h3>
                        <div class="d-flex">
                           <h6 class="text-striked text-muted mr-2">₹1,999</h6>
                           <h6 class="text-success">32% off</h6>
                        </div>
                        <button id=""class="btn btn-primary">Ver Disponibilidad</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
        <script>
          $(function () {
            $('[data-toggle="tooltip"]').tooltip()
          })
        </script>
        `
        
    cardContainer.appendChild(cardDiv);

    })
};

//Buscador

document.addEventListener("keyup", e=>{

  if (e.target.matches("#search")){

      if (e.key === "Backspace"){destino.classList.add("filtro")};

      document.querySelectorAll("#viajes-search").forEach(destino =>{

          destino.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ?destino.classList.remove("filtro")
            :destino.classList.add("filtro")
      }) 
           
  }
})
  
 

//Info para carrito de compras
/*
    // BOTON CARRITO

      let btnAdd = document.getElementById(`agregar${el.id}`)
      btnAdd.addEventListener("click", () => {
        addToCart(el.id);
      });

    });
};*/

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



//Info para carrito de compras

