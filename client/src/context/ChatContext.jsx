import { createContext, useCallback, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLodaing, setIsUserChatsLodaing] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);   

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
        createChat
    }}>
        {children}
    </ChatContext.Provider>)
};
