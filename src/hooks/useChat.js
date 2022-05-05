import {useEffect, useRef, useState} from "react";
import socketIOClient from "socket.io-client";
import {authRequestOptions} from "./requestOptions";



const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

export const useChat = (roomId) => {
    const [messages, setMessages] = useState([]); // Sent and received messages
    const socketRef = useRef();

    useEffect(() => {

        // Creates a WebSocket connection
        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {roomId},
        });

        // Listens for incoming messages
        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
            console.log(message)
            const incomingMessage = {
                ...message,
                ownedByCurrentUser: message.senderId === socketRef.current.id,
            };
            setMessages((messages) => [...messages, incomingMessage]);

            // setState(message.senderId === socketRef.current.id, updatedState => {
            //     const fetchContents = {
            //         message: message.body,
            //         senderID: message.senderId,
            //         ownedByCurrentUser: updatedState
            //
            //
            //     }
            //     fetch(`http://127.0.0.1:5000/api/save-message/`, authRequestOptions(('POST'), fetchContents))
            //         .then(response => response.json())
            //         .then(console.log('Fetched'))
            //         .catch(error => console.log(error))
            // })

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


    };

    return {messages, sendMessage};
};

