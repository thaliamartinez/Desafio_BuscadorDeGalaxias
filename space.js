let nasaAPI = "https://images-api.nasa.gov/";
let ext = "search?q=";

let spaceInput = document.getElementById('inputBuscar');
let btnBuscar = document.getElementById('btnBuscar');
let contenedor = document.getElementById('contenedor');

btnBuscar.addEventListener('click', () => {
const spaceSearch = spaceInput.value.toLowerCase().trim();
const nasaAPISerch = nasaAPI + ext + spaceSearch;

fetch(nasaAPISerch)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})

.then(data => {
    mostrarInfo(data.collection.items);
   })
   .catch(error => {
     console.error('There was a problem with the fetch operation:', error);
   });

});



function mostrarInfo(items){
    contenedor.innerHTML = '';
 items.forEach(item => {
    if (item.links && item.data && item.data.length > 0) {
        const imagenUrl = item.links[0].href; 
        const titulo = item.data[0].title || "Título no disponible";
        const descripcion = item.data[0].description || "Descripción no disponible";
        const fecha = item.data[0].date_created || "Fecha no disponible";

        const div = document.createElement('div');
        div.className = 'col-md-4 mb-4';

        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${imagenUrl}" class="card-img-top" alt="${titulo}">
        <div class="card-body">
        <h3 class="card-title">${titulo}</h3>
        <p class="card-text">${descripcion}</p>
        <small>${fecha}</small>
        `;

        contenedor.appendChild(div);

  }

 });
};

    