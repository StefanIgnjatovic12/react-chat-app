import {useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";
import {authRequestOptions} from "./requestOptions";
import {useCurrentUser} from "../context/CurrentUserContext";


const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

export const useChat = (roomId) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const socketRef = useRef();
    const {fetchCurrentUser} = useCurrentUser()

    useEffect(() => {
        // // Get current user ID and save it to localStorage
        // fetchCurrentUser().then(id => localStorage.setItem('currentUserID', id))
        // // Get all conversation data for current user to populate chats
        // fetch(`http://127.0.0.1:5000/api/user-conversation/${localStorage.getItem('currentUserID')}`,
        //     authRequestOptions(('GET')))
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.log(error))
        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {roomId},
        });

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {

            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
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
            created_by: localStorage.getItem('currentUserID')
        }
        fetch(`http://127.0.0.1:5000/api/save-message/`, authRequestOptions(('POST'), fetchContents))
            .then(response => response.json())
            .then(console.log('Fetched'))
            .catch(error => console.log(error))


    };

    return {messages, sendMessage};
};

