import './App.css'
import { useState, useContext, useEffect } from 'react'

import { useMicrofone } from './hooks/useMicrofone'
import { useSpeaker } from './hooks/useSpeaker'

import { FaRobot, FaExclamationTriangle } from 'react-icons/fa'
import { BiArrowToBottom, BiMicrophone, BiArrowToTop } from 'react-icons/bi'

import { MessagesContext } from './context/MessagesContext'
import { useOpenIA } from './hooks/useOpenIA'

function App() {

  const [showMessages, setShowMessages] = useState(false)
  const { text, handleMicrofone, listining, recognition } = useMicrofone()
  const { command, setSelectedVoice, voicesList } = useSpeaker()
  const { messages, addMessage } = useContext(MessagesContext)
  const { getChatResponse } = useOpenIA()

  useEffect(() => {

    if (text) {
      const textToRead = text

      addMessage({
        role: "user",
        content: textToRead
      })

      getChatResponse(textToRead).then(response => {
        addMessage(response)
        command.speakText(response.content)
      })

    }

  }, [text])

  return (
    <main className="main">

      <div className="container">

        <div className="chatbot">

          <div className="chatbot-icon">
            <button className={`${command.isSpeaking && "active"}`}>
              <FaRobot />
            </button>
          </div>

          <select name="voices" id="voices" onChange={(e) => {
            console.log(parseInt(e.target.value))
            setSelectedVoice(parseInt(e.target.value))
          }}>
            {voicesList.length ? (
              voicesList.map((voice, index) => (
                <option value={index} key={voice.name}>
                  {voice.name}
                </option>
              ))
            ) : (
              <option value="0">Nenhuma voz</option>
            )}
          </select>

        </div>

        {!recognition &&
          <div className="error-recognition">
            <h3>
              <FaExclamationTriangle /> {text}
            </h3>
          </div>
        }

        <div>

          <button className='btn-messages' onClick={() => {
            setShowMessages(!showMessages)
          }}>
            {showMessages ? (<BiArrowToBottom />) : (<BiArrowToTop />)}
          </button>

          <div className={`messages ${showMessages && "show"}`}>
            {

              messages.map((message, index) => (

                <div key={index} className={`message ${message.role === "user" && "me"}`}>
                  <span className="name">{message.role === "user" ? "Human" : "Chatbot"}</span>
                  <span className="body">{message.content}</span>
                </div>

              ))
            }
          </div>
        </div>

        <div className="user">
          <button className={`btn-microfone ${listining && "active"}`}
            onClick={() => {
              handleMicrofone()
              console.log("Ativar microfone")
            }}>
            <BiMicrophone />
            {listining ? "Desligar microfone" : "Ligar microfone"}
          </button>
        </div>

      </div>
    </main>
  )

}

export default App