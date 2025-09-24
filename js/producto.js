    const vinilo = JSON.parse(localStorage.getItem("viniloSeleccionado"));
    const detalle = document.getElementById("detalle");

    if (vinilo) {
      detalle.innerHTML = `
        <div class="detalle-card">
          <img src="${vinilo.artworkUrl100.replace("100x100","600x600")}" alt="${vinilo.trackName}">
          <h2>${vinilo.trackName}</h2>
          <h3>${vinilo.artistName}</h3>
          <p>Precio: $${(vinilo.collectionPrice).toFixed(2)}</p>
          ${vinilo.previewUrl ? `<audio controls src="${vinilo.previewUrl}"></audio>` : ""}
        </div>
      `;
    } else {
      detalle.innerHTML = "<p>No se encontró información del vinilo.</p>";
    }