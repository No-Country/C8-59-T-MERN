const formulario = document.querySelector("#formulario");
const botonEnviar = document.querySelector("#botones button[type='submit']");

formulario.addEventListener("input", () => {
  const email = formulario.querySelector("#email");
  const asunto = formulario.querySelector("#asunto");
  const mensaje = formulario.querySelector("#mensaje");

  if (email.value && asunto.value && mensaje.value) {
    botonEnviar.removeAttribute("disabled");
    botonEnviar.classList.remove("opacity-50");
  } else {
    botonEnviar.setAttribute("disabled", true);
    botonEnviar.classList.add("opacity-50");
  }
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault(); // Previene el envío del formulario y recarga de la página

  // Aquí puedes enviar el correo electrónico utilizando alguna librería o haciendo una solicitud HTTP a tu servidor
  // Luego, muestra un mensaje de éxito o error al usuario
});

const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

formulario.addEventListener("input", e => {
  if (email.value && asunto.value && mensaje.value) {
    botonEnviar.disabled = false;
  } else {
    botonEnviar.disabled = true;
  }
});

formulario.addEventListener("submit", e => {
    e.preventDefault();
  
    // Mostrar mensaje de éxito
    alert("Mensaje enviado con éxito!");
  
    // Limpiar formulario
    formulario.reset();
    botonEnviar.disabled = true;
  });
  
  formulario.addEventListener("reset", e => {
    // Mostrar mensaje de error
    alert("Mensaje no enviado. Por favor, intente de nuevo.");
  });
  

  