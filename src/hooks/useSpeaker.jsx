import { useState } from "react"

export function useSpeaker() {

    const [voicesList, SetVoicesList] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(0)

    window.speechSynthesis.addEventListener("voiceschanged", () => {
        SetVoicesList([...window.speechSynthesis.getVoices()])
        console.log(voicesList)
    })

    function speakText(text) {
        if (text) {
            console.log("Falar")
            const ut = new SpeechSynthesisUtterance(text)
            ut.voice = voicesList[selectedVoice]
            // ut.voice = {
            //     default: false,
            //     lang: "pt-BR",
            //     localService: false,
            //     name: "Google português do Brasil",
            //     voiceURI: "Google português do Brasil"
            // }
            console.log(voicesList)
            console.log(ut.voice)
            window.speechSynthesis.speak(ut)
        }
    }

    return {
        voicesList,
        selectedVoice,
        setSelectedVoice,
        speakText
    }

}