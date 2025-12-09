// 1. Definir la fecha objetivo (24 de Enero, 2026 - 17:00:00)
// Nota: El mes en JS va de 0 a 11, pero usando string es más claro "Month Day, Year Time"
const fechaBoda = new Date("January 24, 2026 17:00:00").getTime();

// 2. Función para actualizar el contador
const actualizarContador = () => {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    // Cálculos matemáticos para tiempo
    // 1000ms = 1s, 60s = 1m, 60m = 1h, 24h = 1d
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // 3. Mostrar el resultado en los elementos con ID
    // Usamos una función auxiliar para agregar un '0' si el número es menor a 10
    document.getElementById("dias").innerText = dias;
    document.getElementById("horas").innerText = formatearNumero(horas);
    document.getElementById("minutos").innerText = formatearNumero(minutos);
    document.getElementById("segundos").innerText = formatearNumero(segundos);

    // 4. Si la cuenta regresiva termina
    if (distancia < 0) {
        clearInterval(intervalo);
        document.querySelector(".timer").innerHTML = "¡ES HOY!";
    }
};

// Función auxiliar para que se vea "05" en lugar de "5"
const formatearNumero = (numero) => {
    return numero < 10 ? `0${numero}` : numero;
};

// 5. Iniciar el intervalo (se ejecuta cada 1000 milisegundos = 1 segundo)
const intervalo = setInterval(actualizarContador, 1000);

// Ejecutar una vez al inicio para evitar el retraso de 1 segundo en la carga
actualizarContador();

const eventos = ['click', 'keydown', 'touchstart','scroll','mousemove'];

function despertarAudio() {
    const audio = document.getElementById('miAudio');
    audio.volume = 0.3;

    // Intentamos reproducir
    audio.play().then(() => {
        // SI FUNCIONÓ: Limpiamos los eventos para que no se repita
        console.log("Audio iniciado con éxito.");
        eventos.forEach(evento => {
            document.removeEventListener(evento, despertarAudio);
        });
    }).catch(error => {
        // Si falla (a veces pasa si el toque fue muy rápido), no quitamos los eventos
        // para intentarlo en la siguiente interacción.
        console.log("Esperando interacción más fuerte...");
    });
}

// 2. Agregamos los "espías" al documento entero
eventos.forEach(evento => {
    document.addEventListener(evento, despertarAudio, { passive: true });
});