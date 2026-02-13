// Funcionalidad para enviar confirmación de asistencia por WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const WHATSAPP_1 = '541123657334';
    const WHATSAPP_2 = '542216722022';
    const btn1 = document.getElementById('botoncito1');
    const btn2 = document.getElementById('botoncito2');
    const inputNombre = document.getElementById('userFullName');
    const inputMensaje = document.getElementById('customMessage');

    function getAsistenciaSeleccionada() {
        const checked = document.querySelector('input[name="attendanceOption"]:checked');
        return checked ? checked.value : '';
    }

    function armarMensaje() {
        const nombre = inputNombre.value.trim();
        const mensaje = inputMensaje.value.trim();
        const asistencia = getAsistenciaSeleccionada();
        // Obtener la restricción alimenticia seleccionada
        const alimenticioChecked = document.querySelector('input[name="alimenticioOption"]:checked');
        let alimenticio = '';
        if (alimenticioChecked) {
            // Tomar el texto del label asociado
            const label = document.querySelector(`label[for="${alimenticioChecked.id}"]`);
            alimenticio = label ? label.textContent.trim() : '';
        }
        let texto = `Hola, mi nombre es ${nombre} y quiero confirmar que ${asistencia}`;
        if (mensaje) texto += `\nmi mensaje es: ${mensaje}`;
        texto += `\nAdemás, mi restricción alimenticia es: ${alimenticio || 'Ninguna'}`;
        return encodeURIComponent(texto);
    }

    function enviarWhatsapp(numero) {
        const mensaje = armarMensaje();
        if (!inputNombre.value.trim() || !getAsistenciaSeleccionada()) {
            alert('Por favor completa tu nombre y selecciona si asistirás o no.');
            return;
        }
        const url = `https://wa.me/${numero}?text=${mensaje}`;
        window.open(url, '_blank');
        // Limpiar campos después de enviar
        inputNombre.value = '';
        inputMensaje.value = '';
        const checked = document.querySelector('input[name="attendanceOption"]:checked');
        if (checked) checked.checked = false;
    }

    if(btn1) btn1.addEventListener('click', function() {
        enviarWhatsapp(WHATSAPP_1);
    });
    if(btn2) btn2.addEventListener('click', function() {
        enviarWhatsapp(WHATSAPP_2);
    });

    // Resaltar opción seleccionada de asistencia
    const radios = document.querySelectorAll('input[name="attendanceOption"]');
    radios.forEach(radio => {
        radio.addEventListener('change', function() {
            radios.forEach(r => r.closest('.asistencia__radio').classList.remove('selected'));
            if (this.checked) this.closest('.asistencia__radio').classList.add('selected');
        });
    });

    // Resaltar opción seleccionada de restricción alimenticia
    const alimenticioRadios = document.querySelectorAll('input[name="alimenticioOption"]');
    alimenticioRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            alimenticioRadios.forEach(r => r.closest('.contenedor__alimenticio').classList.remove('selected'));
            if (this.checked) this.closest('.contenedor__alimenticio').classList.add('selected');
        });
    });
});
