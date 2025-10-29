import { createContext, useEffect, useState } from "react";
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
            const pChats = response.filter((user) => { 
                if (user._id === useEffect._id) return false;

                if (userChats){
                    let isChatCreated = false;

                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    });
                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
        };

        getUsers();
    }, [userChats]);

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
        potentialChats
    }}>
        {children}
    </ChatContext.Provider>)
};
