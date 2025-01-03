import axios from 'axios';
// import { useSpeaker } from './useSpeaker';

// import { MessagesContext } from '../context/MessagesContext'
// import { useContext } from 'react';

export function useOpenIA() {

    // const { addMessage } = useContext(MessagesContext)

    // const { command } = useSpeaker()

    async function getChatResponse(prompt) {
        try {
            const res = await axios.post('https://chatbot-server-e9m3.onrender.com/api/chat', { prompt });
            const data = await res.data;
            console.log(data.response)
            return data.response;
        } catch (error) {
            console.error('Erro:', error);
            return 'Erro ao se comunicar com o servidor.';
        }
    }

    return {
        getChatResponse,
    }

}
