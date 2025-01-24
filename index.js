/*
Para resolver el ejercicio necesitamos:
1. Obtener el chiste.
2. Renderizar el chiste en el HTML dependiendo de si es un "Two Part" o "Single"
    - Si es single, sólo deberíamos ver el chiste.
    - Si es un "Two Part" deberíamos ver la primera línea del chiste, seguido de un botón de detalle que me permita revelar la segunda parte del chiste.
    - Sólo se debe de mostrar el detalle del chiste una vez.
    - Cada uno de los botones debe de tener una función definida.
3. Mejorar el diseño sin afectar la funcionalidad del aplicativo. Use su creatividad. Puede utilizar librerías externas.
    
Si existen dudas al respecto del ejercicio por favor diríjanlas a través del Discord.
Adjunto dos imágenes básicas de como se ve el ejercicio final. 

*/


const API_URL = 'https://v2.jokeapi.dev/joke/Any?lang=es';

// Función para renderizar todos los datos de la API
async function renderJoke() {
    const data = await GetCharac(); // Llamamos a la función existente para obtener los datos

    // Seleccionar el contenedor donde se renderizarán los datos
    const jokeContainer = document.getElementById('joke');

    // Construir el contenido HTML según los datos obtenidos
    let jokeHtml = '';

    if (data.type === 'twopart') {
        // Chiste con setup y delivery
        jokeHtml = `
            <h3>Pregunta:</h3>
            <p>${data.setup}</p>
            <button id="delivery">Mostrar Respuesta</button>
            <p id="deliveryText" style="display: none; margin-top: 10px;"><strong>Respuesta:</strong> ${data.delivery}</p>
        `;
    } else if (data.type === 'single') {
        // Chiste de una sola línea
        jokeHtml = `
            <h3>Chiste:</h3>
            <p>${data.joke}</p>
        `;
    }

    // Agregar detalles de la API en caso de que sean necesarios
    const apiDetails = `
        <h4>Detalles de la API:</h4>
        <p><strong>ID:</strong> ${data.id || 'No disponible'}</p>
        <p><strong>Categoría:</strong> ${data.category || 'No especificada'}</p>
        <p><strong>Idioma:</strong> ${data.lang || 'No disponible'}</p>
        <p><strong>Tipo:</strong> ${data.type || 'Desconocido'}</p>
    `;

    // Insertar el contenido en el contenedor
    jokeContainer.innerHTML = jokeHtml;

    // Si el chiste es de tipo "twopart", agregar funcionalidad al botón
    if (data.type === 'twopart') {
        const DeliveryButton = document.getElementById('delivery');
        const deliveryText = document.getElementById('deliveryText');
        DeliveryButton.addEventListener('click', () => {
            deliveryText.style.display = 'block'; // Mostrar el delivery
           DeliveryButton.style.display = 'none'; // Ocultar el botón
        });
    }
}

// Función existente para obtener los datos de la API
async function GetCharac() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data; // Devolvemos los datos obtenidos
}

// Seleccionar el elemento de la palanca
const palanca = document.getElementById('palanca');

// Función para pulsar la palanca (bajar)
function pulsarPalanca() {
    palanca.src = 'img/palancaDOWN.png'; // Cambiar la imagen a "palanca abajo"
    console.log('Palanca pulsada: posición abajo.');
}

// Función para soltar la palanca (subir)
function soltarPalanca() {
    palanca.src = 'img/palancaUP.png'; // Cambiar la imagen a "palanca arriba"
    console.log('Palanca soltada: posición arriba.');
}

// Asignar eventos a la imagen de la palanca
palanca.addEventListener('mousedown', () => {
    pulsarPalanca(); // Llama a la función para cambiar la imagen
    renderJoke();    // Llama a la función para mostrar el chiste
}); // Al presionar con el mouse
palanca.addEventListener('mouseup', soltarPalanca);   // Al soltar el mouse
palanca.addEventListener('mouseleave', soltarPalanca); // Si el mouse sale de la imagen