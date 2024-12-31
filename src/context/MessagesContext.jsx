import { createContext, useState } from 'react'

export const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {

    const [messages, setMessages] = useState([])

    function addMessage(message) {
        setTimeout(() => moveMessagesToBottom(), 100)
        messages.push(message)
        setMessages([...messages])
    }

    function moveMessagesToBottom() {
        const messagesContainer = document.querySelector(".messages")
        messagesContainer.scrollTop = messagesContainer.scrollHeight + 1000
    }


    return (
        <MessagesContext.Provider value={{ messages, addMessage }}>
            {children}
        </MessagesContext.Provider>
    )
}