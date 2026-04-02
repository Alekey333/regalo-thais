// --- Control Mágico de Pantalla Inicial ---
const pantallaInicio = document.getElementById('pantalla-inicio');
const contenidoPrincipal = document.getElementById('contenido-principal');
const btnAbrir = document.getElementById('btn-abrir');

const audioFondo = document.getElementById('audio-fondo');
const audio17 = document.getElementById('audio-17');
const audio20 = document.getElementById('audio-20');

// Variables para el Crossfade (Transición de DJ)
let currentAudio = audioFondo;
let isFading = false;

btnAbrir.addEventListener('click', () => {
    audioFondo.volume = 0.5;
    audioFondo.play().catch(e => console.log("Auto-play prevenido", e));
    currentAudio = audioFondo;
    
    pantallaInicio.style.transform = 'translateY(-100vh)';
    pantallaInicio.style.opacity = '0';
    
    setTimeout(() => {
        pantallaInicio.classList.add('oculto');
        contenidoPrincipal.classList.remove('oculto');
    }, 800);
});

// --- Función para Transición Suave (Fade Out / Fade In) ---
function cambiarMusicaSuave(nuevoAudio, tiempoInicio = 0) {
    if (currentAudio === nuevoAudio || isFading) return; // Evitar clicks rápidos
    isFading = true;

    let volOut = currentAudio.volume;
    
    // 1. Bajar el volumen de la canción actual
    let fadeOut = setInterval(() => {
        if (volOut > 0.05) {
            volOut -= 0.05;
            currentAudio.volume = volOut;
        } else {
            clearInterval(fadeOut);
            currentAudio.pause();

            // 2. Preparar y subir el volumen de la nueva canción
            nuevoAudio.currentTime = tiempoInicio;
            nuevoAudio.volume = 0;
            nuevoAudio.play().catch(e => console.log(e));
            currentAudio = nuevoAudio;

            let volIn = 0;
            let fadeIn = setInterval(() => {
                if (volIn < 0.75) { // 0.75 es el volumen máximo al que llegará
                    volIn += 0.05;
                    nuevoAudio.volume = volIn;
                } else {
                    clearInterval(fadeIn);
                    isFading = false; // Liberar el seguro
                }
            }, 50); // Velocidad del Fade In
        }
    }, 40); // Velocidad del Fade Out
}

// --- Controladores de Botones Musicales ---
const btnPlay17 = document.getElementById('btn-play-17');
const btnPlay20 = document.getElementById('btn-play-20');
const btnPlayFondo = document.getElementById('btn-play-fondo');

btnPlay20.addEventListener('click', () => {
    // 64 segundos = minuto 1:04 (Donde revienta "20 Rosas")
    cambiarMusicaSuave(audio20, 64);
});

btnPlay17.addEventListener('click', () => {
    // 45 segundos = Donde entra el ritmo bueno de "17 años"
    cambiarMusicaSuave(audio17, 45);
});

btnPlayFondo.addEventListener('click', () => {
    cambiarMusicaSuave(audioFondo, audioFondo.currentTime); 
});

// --- Traductor con Humor ---
const botonesTraducir = document.querySelectorAll('.btn-trad');

botonesTraducir.forEach(boton => {
    boton.addEventListener('click', function() {
        const cajaFrase = this.parentElement;
        const fraseOriginal = cajaFrase.querySelector('.frase-orig');
        const fraseTraducida = cajaFrase.querySelector('.frase-trad');
        
        if (fraseTraducida.classList.contains('oculto')) {
            fraseTraducida.classList.remove('oculto');
            fraseOriginal.classList.add('oculto');
            this.innerHTML = 'Ver Original 🍷';
            this.style.background = '#ffd700'; 
            this.style.color = '#050505'; 
            this.style.borderColor = '#ffd700';
        } else {
            fraseTraducida.classList.add('oculto');
            fraseOriginal.classList.remove('oculto');
            this.innerHTML = 'Traducir 🪄';
            this.style.background = '#050505'; 
            this.style.color = '#ffd700'; 
            this.style.borderColor = '#050505';
        }
    });
});

// --- Lluvia de estrellas ---
const starsContainer = document.getElementById('stars-container');
for (let i = 0; i < 60; i++) { 
    let star = document.createElement('div');
    star.className = 'star';
    let size = Math.random() * 3.5;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = (Math.random() * 2.5 + 1) + 's';
    star.style.animationDelay = Math.random() * 2 + 's';
    starsContainer.appendChild(star);
}