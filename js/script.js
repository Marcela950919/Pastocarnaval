//Menu hamburguesa// 
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("menu-toggle").checked = false;
  });
});

//Saludo//
document.addEventListener("DOMContentLoaded", () => {
  const saludoElemento = document.getElementById("saludo");
  if (!saludoElemento) return;

  const hora = new Date().getHours();
  const idioma = (navigator.language || navigator.userLanguage || "en").toLowerCase();

  let saludo = "";

  if (idioma.startsWith("es")) {
    if (hora < 12) saludo = "¡Buenos días!";
    else if (hora < 18) saludo = "¡Buenas tardes!";
    else saludo = "¡Buenas noches!";
  } else {
    if (hora < 12) saludo = "Good morning!";
    else if (hora < 18) saludo = "Good afternoon!";
    else saludo = "Good evening!";
  }

  saludoElemento.textContent = saludo;
});

//Seccion carrusel imagenes programacion//

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".programacion-content");
  const slides = document.querySelectorAll(".programacion-1");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots-container");

  if (!track || slides.length === 0 || !prevBtn || !nextBtn || !dotsContainer) {
    console.error("Faltan elementos del slider en el HTML");
    return;
  }

  let currentIndex = 0;
  const totalSlides = slides.length;

  // Crear los dots//
  slides.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = i;
      updateSlider();
    });
    dotsContainer.appendChild(dot);
  });

  const updateSlider = () => {
    const slideWidth = slides[0].offsetWidth;  
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  };

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  });

  // Movimiento automático//
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
  }, 5000);

  // Actualizar el slider al redimensionar la ventana//
  window.addEventListener("resize", updateSlider);
});


//seccion cuenta regresiva//
// Fecha objetivo: 2 de enero de 2026 a las 00:00 horas//
const fechaObjetivo = new Date("2026-01-02T00:00:00").getTime();

// Actualizar cada segundo
const intervalo = setInterval(() => {
  const ahora = new Date().getTime();
  const diferencia = fechaObjetivo - ahora;

  if (diferencia <= 0) {
    document.getElementById("dias").innerText = "00";
    document.getElementById("horas").innerText = "00";
    document.getElementById("minutos").innerText = "00";
    document.getElementById("segundos").innerText = "00";
    clearInterval(intervalo); // ayuda a detener la cuenta regresiva
    return;
  }

  // hacer el calculo de los días, horas, minutos y segundos//
  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  // Actualizar los valores en los elementos HTML//
  document.getElementById("dias").innerText = dias < 10 ? `0${dias}` : dias;
  document.getElementById("horas").innerText = horas < 10 ? `0${horas}` : horas;
  document.getElementById("minutos").innerText = minutos < 10 ? `0${minutos}` : minutos;
  document.getElementById("segundos").innerText = segundos < 10 ? `0${segundos}` : segundos;
}, 1000);
