import { createContext, useState } from 'react'

export const MessagesContext = createContext()

export const MessagesProvider = ({ children }) => {

    const [messages, setMessages] = useState([])

    function addMessage(message) {
        setMessages([...messages, message])
    }

    return (
        <MessagesContext.Provider value={{ messages, addMessage }}>
            {children}
        </MessagesContext.Provider>
    )
}