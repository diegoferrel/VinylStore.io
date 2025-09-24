const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

const grid = document.querySelector(".grid");
const buscador = document.getElementById("buscador");
const buscarBtn = document.getElementById("buscar-btn");

let audio = null; 

async function cargarVinilos(busqueda = "vinyl") {
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(busqueda)}&entity=song&limit=9`);
    const data = await res.json();

    grid.innerHTML = ""; 

    if (data.results.length === 0) {
      grid.innerHTML = "<p>No se encontraron resultados 😢</p>";
      return;
    }

    data.results.forEach(cancion => {
      const card = document.createElement("article");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${cancion.artworkUrl100.replace("100x100", "300x300")}" alt="${cancion.trackName}">
        <h3>${cancion.trackName}</h3>
        <p>${cancion.artistName}</p>
        <button class="play-btn">▶️ Escuchar Preview</button>
        <button class="details-btn"> Ver Mas</button>
      `;

      
      card.querySelector(".details-btn").addEventListener("click", () => {
        localStorage.setItem("viniloSeleccionado", JSON.stringify(cancion));
        window.location.href = "producto.html";
      });

      const btn = card.querySelector(".play-btn");
      let audio = new Audio(cancion.previewUrl);
      btn.addEventListener("click", () => {
        if (audio.paused) {
          audio.play();   
          btn.innerHTML = "⏸️ Pausar Preview"
        } else {
          audio.pause();
          audio.currentTime = 0; 
          btn.innerHTML = "▶️ Escuchar Preview"
        }

      });

      grid.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar vinilos:", error);
    grid.innerHTML = "<p>Error al cargar el catálogo </p>";
  }
}

// Evento del botón de búsqueda
buscarBtn.addEventListener("click", () => {
  const termino = buscador.value.trim();
  if (termino) {
    cargarVinilos(termino);
  }
});


// Carga inicial
cargarVinilos();