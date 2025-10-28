import { createContext, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLodaing, setIsUserChatsLodaing] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

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
        userChatsError
    }}>
        {children}
    </ChatContext.Provider>)
};
