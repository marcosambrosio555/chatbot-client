import './App.css'
import { useState, useContext, useEffect } from 'react'

import { FaRobot, FaExclamationTriangle } from 'react-icons/fa'
import { BiArrowToBottom, BiMicrophone, BiArrowToTop } from 'react-icons/bi'

import { useMicrofone } from './hooks/useMicrofone'
import { useSpeaker } from './hooks/useSpeaker'
import { useOpenIA } from './hooks/useOpenIA'

import { MessagesContext } from './context/MessagesContext'

function App() {

  const [showMessages, setShowMessages] = useState(false)
  const { text, handleMicrofone, listining, recognition } = useMicrofone()
  const { command, changeVoice, voicesList } = useSpeaker()
  const { getChatResponse } = useOpenIA()
  const { messages, addMessage } = useContext(MessagesContext)

  const [answer, setAnswer] = useState("")

  useEffect(() => {

    if (text) {

      addMessage({ role: "user", content: text })

      getChatResponse(text).then(response => {
        setAnswer(response.content)
        addMessage(response)
        command.speakText(response.content)
      })

    }

  }, [text])

  // async function say(text) {

  //   addMessage({ role: "user", content: text })

  //   const response = await getResponse(text)

  //   setAnswer(response.content)
  //   addMessage({ role: "assistent", content: response.content })
  //   command.speakText(response.content)

  // }

  // function getResponse() {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(
  //         {
  //           role: "assistent",
  //           content: "Mas o sombra veio e sem nada ei fiquei"
  //         }
  //       )
  //     }, 4000)
  //   })
  // }

  return (
    <main className="main" translate='no'>

      <div className="container">

        <div className="chatbot">

          <div className="chatbot-icon">
            <button className={`${command.isSpeaking && "active"}`}>
              <FaRobot />
            </button>
          </div>

          <select name="voices" id="voices" onChange={(e) => {
            changeVoice(parseInt(e.target.value))
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

        <div className="errors">
          <div className="block">
            Mensagens : {JSON.stringify(messages)}
          </div>
          <div className="block">
            Pergunta : {JSON.stringify(text)}
          </div>
          <div className="block">
            Resposta : {JSON.stringify(answer)}
          </div>
          <div className="block"></div>
          <div className="block"></div>
        </div>

      </div>
    </main>
  )

}

export default App