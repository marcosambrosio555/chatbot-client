import { useState, useContext } from "react"
import { useOpenIA } from "./useOpenIA"

import { MessagesContext } from '../context/MessagesContext'


export function useMicrofone() {

    const { addMessage } = useContext(MessagesContext)

    const [listining, setListining] = useState(false)
    const [text, setText] = useState("")

    const { getChatResponse } = useOpenIA()

    const speechRecognition = window.SpeechRecognition
        || window.webkitSpeechRecognition

    const recognition = speechRecognition !== undefined ? new speechRecognition() : null

    if (!recognition) {
        setText("Speech Recognition is not found!")
        return null
    }

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
    }

    recognition.onresult = (e) => {
        recognition.lang = "pt_BR"
        console.log(e.results[0][0].transcript)
        console.log("Transcrevendo")
        setText(e.results[0][0].transcript)
        getChatResponse(text)
        addMessage({
            role: "user",
            content: text
        })
    }

    function handleMicrofone() {
        if (!recognition) return
        listining ? recognition.stop() : recognition.start()
    }

    return {
        recognition,
        text,
        listining,
        handleMicrofone,
    }

}