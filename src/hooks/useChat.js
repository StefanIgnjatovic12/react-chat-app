import {useEffect, useRef} from "react";
import socketIOClient from "socket.io-client";
import {authRequestOptions} from "./requestOptions";
import {useActiveConvo} from "../context/ActiveConvoContext";


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = `https://drf-react-chat-frontend.herokuapp.com`;

export const useChat = () => {

    const socketRef = useRef();
    const {messages, setMessages, activeConvo, headerConvo, reloadSideBar, setReloadSideBar} = useActiveConvo()
    const roomId = activeConvo
    useEffect(() => {
        console.log('useChat useEffect ran')
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {roomId},
        });
        console.log('SocketRef.current:')
        console.log(socketRef.current)
        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            const incomingMessage = {
                message: message.body,
                created_by: localStorage.getItem('currentUserID'),

            };
            console.log('messages set in useChat useFfect')
            setMessages((messages) => [...messages, incomingMessage]);

        });

        // Destroys the socket reference
        // when the connection is closed
        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    // Sends a message to the server that
    // forwards it to all users in the same room
    const sendMessage = (messageBody) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            body: messageBody,
            senderId: socketRef.current.id,
        });
        const fetchContents = {
            message: messageBody,
            created_by: localStorage.getItem('currentUserID'),
            convo_id: activeConvo ? activeConvo : headerConvo

        }
        fetch(`https://drf-react-chat-backend.herokuapp.com/api/save-message/`, authRequestOptions(('POST'), fetchContents))
            .then(response => response.json())
            .then(setReloadSideBar(reloadSideBar + 1))
            .catch(error => console.log(error))


    };

    return {messages, sendMessage};
};

