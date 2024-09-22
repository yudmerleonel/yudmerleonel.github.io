// Detectar el botón y el campo de entrada
const voiceButton = document.getElementById("voiceButton");
const userInput = document.getElementById("userInput");
const output = document.getElementById("output");

// Función para que el asistente hable
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Idioma español
    speechSynthesis.speak(utterance);
}

// Evento para el clic del botón
voiceButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    
    if (message) {
        output.textContent = "Mensaje enviado: " + message;
        
        // Respuestas predefinidas según el mensaje
        if (message.toLowerCase().includes("hola")) {
            speak("¡Hola!, señorita violeta, Soy Alicia, soy una inteligencia artificial que el loco de tu enamorado Leonel flores, creó con mucho cariño. Hoy me pidió que te recordara algo muy importante: te ama más que la vaca... ¡muuuuuuuuuuucho! Y como si eso no fuera suficiente, siempre está trabajando en mejorarme, pero en realidad solo tiene una cosa en la cabeza: ¡tú! Así que felicidades, porque tienes un fan número uno que piensa en ti todo el tiempo, mientras me programa y mientras sueña despierto. feliz 21 de setiembre por parte de mi creador leonel flores ");
        } else if (message.toLowerCase().includes("cómo estás")) {
            speak("Estoy bien, gracias por preguntar.");
        } else {
            speak("No entendí tu mensaje.");
        }
    } else {
        output.textContent = "Por favor, escribe un mensaje.";
        speak("Por favor, escribe un mensaje.");
    }
});
