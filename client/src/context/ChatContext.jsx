import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import {io} from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLodaing, setIsUserChatsLodaing] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]); 
    const [currentChat, setCurrentChat] = useState(null);  
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);

    console.log("current chat messages: ", messages);
    
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`);

            if (response.error){
                return console.log("Error fetching potential users: ", response);
            }
            const pChats = response.filter((u) => { 
                if (user?._id === u._id) return false;

                let isChatCreated = false;
                if (userChats){

                    isChatCreated = userChats?.some((chat) => {
                        return chat.members.includes(u._id);
                    });
                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
        };

        getUsers();
    }, [userChats]);

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);
            
            setIsMessagesLoading(false);
            if (response.error){
                return setMessagesError(response);
            }
            
            setMessages(response);
        }

        getMessages();
    }, [currentChat]);

    const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage) => {
        if (textMessage){
           const response = await postRequest(`${baseUrl}/messages`,
            JSON.stringify({
                chatId: currentChatId,
                senderId: sender._id,
                text: textMessage
            }));
            
            if (response.error){
                return setSendTextMessageError(response);
            }

            setNewMessage(response);
            setMessages((prev) => [...prev, response]);
            setTextMessage("");
        }
    }, []);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async(firstId, secondId) => {
        const response = await postRequest(`${baseUrl}/chats`, 
            JSON.stringify({firstId, secondId}));
        
        if (response.error){
            return console.log("Error creating chat : ", response);
        }

        setUserChats((prev) => [...prev, response]);
    }, []);

    useEffect(() => {
        const getUserChats = async () => {
            setIsUserChatsLodaing(true);
            setUserChatsError(null);

            if (user?._id){
                const response = await getRequest(`${baseUrl}/chats/${user._id}`);
                
                setIsUserChatsLodaing(false);
                if (response.error){
                    return setUserChatsError(response);
                }
                
                setUserChats(response);
            }
        }

        getUserChats();
    }, [user]);

    return (<ChatContext.Provider value={{
        userChats,
        isUserChatsLodaing,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage
    }}>
        {children}
    </ChatContext.Provider>)
};
