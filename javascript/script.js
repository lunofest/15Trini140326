// ---------------------- temporizador -------------------------
function updateTimer() {
    const targetDate = new Date("march 14, 2026 21:30:00").getTime();
    const currentDate = new Date().getTime();
    const timeRemaining = targetDate - currentDate;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;
}

updateTimer();
setInterval(updateTimer, 1000);




// ---------------- MUSICA -----------------
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('audio-musica');
    const icons = document.querySelectorAll('.music__icon');
    const rebobinarIcon = icons[0];
    const playIcon = icons[1];
    const pauseIcon = icons[2];
    const adelantarIcon = icons[3];

    if (!audio) {
        alert('No se encontró el elemento de audio.');
        console.error('No se encontró el elemento de audio.');
        return;
    } else {
        console.log('Elemento de audio encontrado:', audio);
    }

    if (pauseIcon) pauseIcon.style.display = 'none';

    if (playIcon) {
        playIcon.addEventListener('click', () => {
            console.log('Play presionado');
            audio.muted = false;
            audio.volume = 1;
            audio.play().then(() => {
                console.log('Audio reproduciéndose');
            }).catch(e => {
                alert('No se pudo reproducir la música. Verifica que el archivo exista y que tu navegador permita la reproducción.');
                console.error('Error al reproducir audio:', e);
            });
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        });
    }

    if (pauseIcon) {
        pauseIcon.addEventListener('click', () => {
            console.log('Pause presionado');
            audio.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
        });
    }

    if (rebobinarIcon) {
        rebobinarIcon.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        });
    }

    if (adelantarIcon) {
        adelantarIcon.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        });
    }
});





// --------------------------- playlist --------------------------------

document.addEventListener('DOMContentLoaded', function() {
  // Definir los números de teléfono
  const phoneNumber1 = '541123657334'; // Número para el primer botón
  const phoneNumber2 = '543816591298'; // Número para el segundo botón

  // Función para enviar mensaje por WhatsApp
  function sendMessage(phoneNumber) {
      const name = document.getElementById('userName').value;
      const message = document.getElementById('whatsappMessage').value;

      if (name.trim() === '' || message.trim() === '') {
          alert('Por favor, completa ambos campos antes de enviar.');
          return;
      }

      const fullMessage = `*Nombre y Apellido:* ${name}\n\n*Tema recomendado:* ${message}`;
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(fullMessage)}`;

      // Abre la URL de WhatsApp en una nueva pestaña
      window.open(whatsappURL, '_blank');

      // Mostrar mensaje de confirmación
      alert('Mensaje enviado');

      // Limpiar los campos de entrada
      document.getElementById('userName').value = '';
      document.getElementById('whatsappMessage').value = '';

      // Volver al bloque de formulario
      document.querySelector('.playlist').scrollIntoView({ behavior: 'smooth' });
  }

  // Asignar eventos a los botones
  document.getElementById('botonplay1').addEventListener('click', function() {
      sendMessage(phoneNumber1);
  });

  document.getElementById('botonplay2').addEventListener('click', function() {
      sendMessage(phoneNumber2);
  });
});




// ----------------- CONFIRMACION ----------------


// Mostrar/ocultar los datos bancarios con transición

document.addEventListener('DOMContentLoaded', function () {
    // Constantes de números de WhatsApp
    const WHATSAPP_1 = '541123657334';
    const WHATSAPP_2 = '542216722022';
    const toggleBtn = document.getElementById('toggle__button');
    const aliasDiv = document.querySelector('.alias');
    const copiarBtn = document.querySelector('.alias__copiar');
    const aliasText = aliasDiv.querySelector('h5.alias');
    const overlay = document.getElementById('copiado-overlay');
    const lightbox = document.getElementById('copiado-lightbox');

    // Inicialmente oculto
    aliasDiv.classList.add('alias--hidden');

    toggleBtn.addEventListener('click', function () {
        aliasDiv.classList.toggle('alias--visible');
        aliasDiv.classList.toggle('alias--hidden');
    });

    copiarBtn.addEventListener('click', function () {
        // Copiar el texto del alias
        if (aliasText) {
            navigator.clipboard.writeText(aliasText.textContent.trim())
                .then(() => {
                    // Mostrar overlay y lightbox
                    overlay.classList.add('visible');
                    setTimeout(() => {
                        overlay.classList.remove('visible');
                    }, 1200);
                });
        }
    });


});
