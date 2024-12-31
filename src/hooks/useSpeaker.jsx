import { useEffect, useState } from "react"

export function useSpeaker() {

    const [voicesList, setVoicesList] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(0)
    const [isSpeaking, setIsSpeaking] = useState(false)

    window.speechSynthesis.addEventListener("voiceschanged", () => {
        setVoicesList([...window.speechSynthesis.getVoices()])
    })

    useEffect(() => {
        setVoicesList([...window.speechSynthesis.getVoices()])
    }, [])

    function changeVoice(voice) {
        setSelectedVoice(voice)
    }

    function speakText(text) {
        if (text) {
            const ut = new SpeechSynthesisUtterance(text)
            ut.voice = voicesList[selectedVoice]
            console.log(voicesList)
            console.log(selectedVoice)
            console.log(voicesList[selectedVoice])
            console.log(ut.voice)
            window.speechSynthesis.speak(ut)
        }
    }

    function stopSpeak() {
        window.speechSynthesis.cancel()
    }

    function pauseSpeak() {
        window.speechSynthesis.pause()
    }

    function continueSpeak() {
        window.speechSynthesis.resume()
    }

    useEffect(() => {
        updateSpeaking()
    }, [])

    function updateSpeaking() {
        setIsSpeaking(window.speechSynthesis.speaking)
        requestAnimationFrame(updateSpeaking)
    }

    return {
        voicesList,
        selectedVoice,
        changeVoice,
        command: {
            speakText,
            stopSpeak,
            pauseSpeak,
            continueSpeak,
            isSpeaking
        }
    }

}