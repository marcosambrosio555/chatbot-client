import { useState } from "react"

export function useMicrofone() {

    const [listining, setListining] = useState(false)
    const [state, setState] = useState({ error: null, success: null, result: null })

    let text = ""

    const speechRecognition = window.SpeechRecognition
        || window.webkitSpeechRecognition

    const recognition = speechRecognition !== undefined ? new speechRecognition() : null

    if (!recognition) {
        text = "Speech Recognition is not found!"
        return null
    }

    recognition.lang = "pt_BR"

    recognition.onstart = () => {
        setListining(true)
        console.log("Ligando")
    }
    recognition.onend = () => {
        setListining(false)
        console.log("Desligando")
    }

    recognition.onerror = (e) => {
        console.log("error : ", e)
        setState({ ...state, error: e.error })
        console.log(state)
    }

    recognition.onresult = (e) => {
        text = e.results[0][0].transcript
        console.log(e)
        console.log(e.results)
        console.log(e.results[0])
        console.log(e.results[0][0])
        console.log(e.results[0][0].transcript)
        console.log("Transcrevendo")
        setState({ ...state, success: e, result: e.results[0][0].transcript })
    }

    function handleMicrofone() {
        if (!recognition) {
            return
        }
        listining ? recognition.stop() :
            recognition.start()
    }


    return {
        recognition,
        text,
        listining,
        handleMicrofone,
        state
    }

}