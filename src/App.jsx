import './App.css'
import { useMicrofone } from './hooks/useMicrofone'
import { useSpeaker } from './hooks/useSpeaker'

function App() {

  const microfone = useMicrofone()
  const { speakText, setSelectedVoice, voicesList } = useSpeaker()

  const text = "Olá , eu sou o Max , eu era um rei , mas o sombra veio e sem nada eu fiquei .Quero o meu reino como sempre viveu , mexe o teu corpo como a Lina e eu."

  return (
    <main className="main">

      <section className="chatbot">
        <div className="container">
          <h2>Chatbot</h2>
          <div className="messages">
            <div className="message">
              <span className="name">chatbot</span>
              <span className="body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique alias enim numquam dicta veniam culpa, illum fuga est suscipit iste omnis praesentium, cupiditate vero iure laboriosam, maiores dolorem ea ratione.</span>
            </div>
            <div className="message me">
              <span className="name">chatbot</span>
              <span className="body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique alias enim numquam dicta veniam culpa, illum fuga est suscipit iste omnis praesentium, cupiditate vero iure laboriosam, maiores dolorem ea ratione.</span>
            </div>
          </div>
          <form className="form">
            <input type="text" placeholder='Digite aqui sua messagem' />
            <button type='submit'>Enviar</button>
          </form>
        </div>
      </section>

      <section className='microfone'>
        <div className="container">
          <h2>Gravador de voz </h2>
          <div className='text-area'>
            {microfone.text}
          </div>
          <div>
            <button onClick={() => microfone.handleMicrofone()}>
              {microfone.listining ? "Desligar microfone" : "Ligar microfone"}</button>
          </div>
        </div>
      </section>

      <section className="speaker">
        <div className="container">
          <h2>Leitor de texto</h2>
          <div className="text">
            {text}
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
          <button onClick={() => speakText(text)}>Ler texto</button>
        </div>
      </section>

    </main>
  )

}

export default App