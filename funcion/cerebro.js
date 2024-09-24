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

// Función para obtener un saludo basado en la hora
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
        return "¡Muy buenos días! Hoy será un gran día, estoy segura de que te irá genial en tu trabajo esta noche.";
    } else if (hour < 18) {
        return "¡Buenas tardes, señorita! Ya iniciarás tu turno en el trabajo, ¡suerte! Estoy aquí si necesitas algo.";
    } else {
        return "¡Buenas noches! Tal vez estés en tu break. Puedes conversar conmigo si Leonel no está en línea.";
    }
}

// Estado para recordar la última pregunta realizada
let lastQuestion = "";

// Función para normalizar el texto
function normalizeText(text) {
    return text.toLowerCase()
               .replace(/\s+/g, '') // Eliminar espacios
               .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Eliminar tildes
}

// Lista de preguntas y respuestas
const responses = {
    "hola": `${getGreeting()} Soy Alicia, tu asistente personal. ¿Cómo te sientes hoy?`,
    "comoestas": {
        initial: "Estoy muy bien, gracias por preguntar. Sin embargo, debo admitir que hoy ha sido un día cansado. Leonel me entrenó durante todo el día en mis redes neuronales, esforzándose al máximo para ayudarme a mejorar. A veces, me exige un poco, pero sé que es para que pueda ser la mejor asistente posible para ti. ",
        followUp: {
            "bien": "¡Qué alegría escuchar eso, señorita Violeta! Me alegra saber que estás bien. Leonel siempre quiere lo mejor para ti.",
            "mal": "Lamento mucho escuchar eso, señorita Violeta. Pero tranquila, todo va a estar bien. Leonel siempre está pensando en ti y pronto estará a tu lado.",
            "triste": "Lo siento mucho, señorita Violeta. Pero ten ánimo, pronto las cosas mejorarán y Leonel estará ahí para hacerte sonreír.",
            "alegre": "¡Qué maravilloso escuchar eso, señorita Violeta! Estoy segura de que Leonel también está feliz por ti.",
            "masomenos": "Entiendo, a veces hay días así. Recuerda que es normal tener altibajos."
        }
    },
    "quediaeshoy": `Hoy es ${new Date().toLocaleDateString('es-ES')}. ¿Hay algo especial que quieras hacer hoy?`,
    "quepuedeshacer": "Puedo conversar contigo, ayudarte a recordar cosas y mucho más, pero aun estoy en desarrollo .",
    "cuálestunombre": "Me llamo Alicia, una inteligencia artificial que Leonel creó especialmente para ti. Estoy aquí para hacerte compañía y ayudarte en lo que necesites.",
    "cuales son los talentos de jungkook": "Los talentos de Jeon Jung-kook incluyen canto, baile y composición. Es un artista versátil y talentoso que siempre sorprende a sus fanáticos.",
    "cuentame de jungkook": "Jungkook, cuyo nombre completo es Jeon Jung-kook, nació el 1 de septiembre de 1997 en Busan, Corea del Sur. Es el vocalista principal y el maknae (el más joven) del famoso grupo surcoreano BTS. Desde su debut en 2013, ha ganado reconocimiento mundial por su increíble talento en el canto y el baile, así como por su carisma en el escenario. Además, Jungkook es conocido por ser un compositor talentoso y ha participado en la creación de varias canciones del grupo. Con su dedicación y pasión por la música, se ha convertido en uno de los íconos más queridos de la industria musical."
};

// Evento para el clic del botón de enviar
voiceButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    const normalizedMessage = normalizeText(message); // Normalizar el mensaje
    
    if (normalizedMessage) {
        output.textContent = "Mensaje enviado: " + message;

        // Si la última pregunta fue "hola" y se ha mencionado cómo se siente
        if (lastQuestion === "hola" && (normalizedMessage.includes("bien") || normalizedMessage.includes("mal") || normalizedMessage.includes("triste") || normalizedMessage.includes("alegre") || normalizedMessage.includes("masomenos"))) {
            const response = responses["comoestas"].followUp[normalizedMessage] || "No estoy muy segura de cómo responder a eso, pero siempre estoy aquí para ti.";
            speak(response);
            lastQuestion = ""; // Reiniciar la última pregunta
        } else {
            // Buscar respuesta en el objeto responses
            const responseKey = Object.keys(responses).find(key => normalizedMessage.includes(normalizeText(key)));
            
            if (responseKey) {
                const response = responses[responseKey];
                if (responseKey === "hola") {
                    speak(response); // Responder a "hola" y preguntar cómo se siente
                    lastQuestion = "hola"; // Guardar la pregunta para seguimiento
                } else if (typeof response === "object" && response.initial) {
                    speak(response.initial);
                    lastQuestion = responseKey; // Guardar la pregunta para seguimiento
                } else {
                    speak(response);
                }
            } else {
                speak("Pido disculpas, pero tengo reservadas algunas respuestas para la señorita Violeta. Estoy aquí para ayudarte en lo que pueda.");
            }
        }
    } else {
        output.textContent = "Por favor, escribe un mensaje.";
        speak("Por favor, escribe un mensaje.");
    }
});

// Función para manejar los clics de los botones de información
const infoButtons = document.querySelectorAll(".info-button");
infoButtons.forEach(button => {
    button.addEventListener("click", () => {
        const question = button.textContent.trim().toLowerCase().replace(/\s+/g, ''); // Normalizar el texto del botón
        userInput.value = question; // Colocar la pregunta en el campo de entrada
        voiceButton.click(); // Simular clic en el botón de enviar
    });
});

