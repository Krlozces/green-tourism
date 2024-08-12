import React from 'react';
import Chat from 'react-chatbotify';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory  } from "@google/generative-ai";

export default function Chatbot({ api }) {
    let apiKey = api;
	let modelType = "gemini-1.5-flash";
	let hasError = false;
	const helpOptions = ["Contacto", "Sobre nosotros", "Paquetes", "Horario de atención"];

	const gemini_stream = async (params) => {
		try {
			const genAI = new GoogleGenerativeAI(apiKey);
			const model = genAI.getGenerativeModel({ model: modelType });
			const inputWithContext = `${params.context}\n${params.userInput}`;

			const result = await model.generateContentStream(inputWithContext);

			let text = "";
			let offset = 0;
			for await (const chunk of result.stream) {
				const chunkText = chunk.text();
				text += chunkText;
				// inner for-loop used to visually stream messages character-by-character
				// feel free to remove this loop if you are alright with visually chunky streams
				for (let i = offset; i < chunkText.length; i++) {
					// while this example shows params.streamMessage taking in text input,
					// you may also feed it custom JSX.Element if you wish
					await params.streamMessage(text.slice(0, i + 1));
					await new Promise(resolve => setTimeout(resolve, 30));
				}
				offset += chunkText.length;
			}

			// in case any remaining chunks are missed (e.g. timeout)
			// you may do your own nicer logic handling for large chunks
			for (let i = offset; i < text.length; i++) {
				await params.streamMessage(text.slice(0, i + 1));
				await new Promise(resolve => setTimeout(resolve, 30));
			}
			await params.streamMessage(text);
		} catch (error) {
			await params.injectMessage("Unable to load model, is your API Key valid?");
			hasError = true;
		}
	}
	const flow={
		start: {
			message: "¡Hola, soy ChatGreen! ¿Cuál es tu duda?",
			options: helpOptions,
			path: "process_options",
			isSensitive: false
		},
		process_options: {
			transition: {duration: 0},
			chatDisabled: true,
			path: async (params) => {
				let answer = "";
				switch (params.userInput) {
				case "Contacto":
					answer = "Teléfono: +1 (555) 123-4567 - Correo Electrónico: info@turismoverde.com - Dirección: Calle Verde 123, Ciudad Verde, País Verde";
					break;
				case "Sobre nosotros":
					answer = "Turismo Verde es una agencia de viajes especializada en ecoturismo y turismo sostenible. Ofrecemos experiencias únicas que permiten a nuestros clientes disfrutar de la naturaleza, respetando y preservando el medio ambiente. Nos enfocamos en viajes que combinan aventura, cultura, y la posibilidad de contribuir positivamente al entorno natural y a las comunidades locales.";
					break;
				case "Paquetes":
					answer = "Contamos con diferentes tipos de paquetes tanto nacionales como internacionales. Pregunta sin compromiso que es nuestro deber atenderte!";
					break;
				case "Horario de atención":
					answer = "Nuestros horarios de atención son de Lunes a Viernes: 9:00 AM - 6:00 PM Sábados: 10:00 AM - 4:00 PM Domingos y festivos: 9:00 AM - 6:00 PM ";
					break;
				default:
					return "loop";
				}
				await params.injectMessage("Ok!");
				setTimeout(() => {
					params.injectMessage(answer)
				}, 1000)
				return "loop"
			},
		},
		loop: {
			message: async (params) => {
				params.context =  `
				Este es el contexto que debes seguir para las interacciones. Responde únicamente a consultas relacionadas con el turismo, ya que nuestra empresa se especializa exclusivamente en este sector. Puedes mantener un tono amigable y continuar el hilo de la conversación, siempre enfocándote en temas turísticos.
				Horario de Atención:

				Lunes a Viernes: 9:00 AM - 6:00 PM
				Sábados: 10:00 AM - 4:00 PM
				Domingos y festivos: 9:00 AM - 6:00 PM 
				
				Descripción de la Empresa:
				Turismo Verde es una agencia de viajes especializada en ecoturismo y turismo sostenible. Ofrecemos experiencias únicas que permiten a nuestros clientes disfrutar de la naturaleza, respetando y preservando el medio ambiente. Nos enfocamos en viajes que combinan aventura, cultura, y la posibilidad de contribuir positivamente al entorno natural y a las comunidades locales.
				
				Servicios Ofrecidos:
				
				Paquetes de Ecoturismo:
				
				Explora la Selva Amazónica: Un recorrido de 7 días por la Amazonía, donde podrás convivir con comunidades locales, aprender sobre la flora y fauna de la región, y participar en actividades de reforestación.
				Aventura en los Andes: Un paquete de 5 días en los Andes, con caminatas por senderos ancestrales, visita a sitios arqueológicos, y actividades de voluntariado con comunidades indígenas.
				Descubre la Biodiversidad de Costa Rica: Un viaje de 6 días por los parques nacionales de Costa Rica, enfocado en la observación de vida silvestre, como aves, mamíferos y reptiles.
				Paquetes de Turismo Sostenible:
				
				Cultura y Sostenibilidad en Bali: Un paquete de 8 días en Bali, que incluye talleres de sostenibilidad, visitas a templos, y estadías en eco-lodges.
				Ruta del Vino Orgánico en España: Un recorrido de 4 días por viñedos ecológicos en España, con degustaciones de vinos orgánicos y charlas sobre agricultura sostenible.
				Preguntas Frecuentes:
				
				¿Qué es el ecoturismo?
				
				El ecoturismo es una forma de turismo que implica viajar a áreas naturales, respetando y preservando el medio ambiente, y contribuyendo al bienestar de las comunidades locales.
				¿Cómo puedo reservar un paquete?
				
				Puedes reservar un paquete directamente en nuestro sitio web, llamando a nuestro número de atención al cliente, o visitando nuestras oficinas.
				¿Es necesario tener experiencia previa en actividades al aire libre?
				
				No es necesario. Nuestros paquetes están diseñados para todos los niveles de experiencia, desde principiantes hasta expertos.
				¿Los viajes incluyen seguro?
				
				Sí, todos nuestros paquetes incluyen un seguro de viaje que cubre emergencias médicas y otros incidentes.
				¿Cómo contribuye Turismo Verde al medio ambiente?
				
				Colaboramos con organizaciones locales para apoyar proyectos de conservación y desarrollo sostenible. Además, promovemos prácticas responsables durante todos nuestros viajes.
				Contactos:
				
				Teléfono: +1 (555) 123-4567
				Correo Electrónico: info@turismoverde.com
				Dirección: Calle Verde 123, Ciudad Verde, País Verde`;
				await gemini_stream(params);
			},
			path: () => {
				if (hasError) {
					return "start"
				}
				return "loop"
			}
		}
	}
    const options = {
        botBubble:{
            animate: true,
            showAvatar: true,
        },
        theme: {
            embedded: true
        },
        chatHistory: {
            storageKey: "conversations_summary"
        },
        tooltip:{
            mode: "CLOSE",
            text: "¿Alguna pregunta? 😊"
        },
		header: {
			title: (
				<div style={{cursor: "pointer", margin: 0, fontSize: 20, fontWeight: "bold"}} onClick={
					() => window.open("https://github.com/krlozces/")
				}>
					Turismo Verde
				</div>
			),
			showAvatar: true
		},
        chatInput:{
            enabledPlaceholderText: "Escribe tu mensaje...",
        }
    };
	const styles = {
		notificationBadgeStyle: {right: "8px", top: "4px", fontSize: "10px"},
		// chatButtonStyle: {right: "100px"}
	};
    return (
        <>
			<Chat flow={flow} settings={options} styles={styles} />
		</>
    )
}
