import { useEffect, useState } from "react"

export function useSpeaker() {

    const [voicesList, SetVoicesList] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(0)
    const [isSpeaking, setIsSpeaking] = useState(false)

    window.speechSynthesis.addEventListener("voiceschanged", () => {
        SetVoicesList([...window.speechSynthesis.getVoices()])
    })

    useEffect(() => {
        SetVoicesList([...window.speechSynthesis.getVoices()])
    }, [])

    function speakText(text) {
        console.log(text)
        if (text) {
            const ut = new SpeechSynthesisUtterance(text)
            ut.voice = voicesList[selectedVoice]
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
        setSelectedVoice,
        command: {
            speakText,
            stopSpeak,
            pauseSpeak,
            continueSpeak,
            isSpeaking
        }
    }

}