import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Container, Stack } from "react-bootstrap";
import PotentialChats from "../components/chat/PotentialChats";
import UserChat from "../components/chat/UserChat";

const Chat = () => {

    const {user} = useContext(AuthContext);
    const {userChats, isUserChatsLodaing, userChatsError} = useContext(ChatContext);

    return (<>
    
    <PotentialChats />
    <Container>
        {userChats?.length < 1 ? null : (
            <Stack direction="horizontal" gap={4} className="align-items-start">
                <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
                    {isUserChatsLodaing && <p>Loading Chats...</p>}
                    {userChats?.map((chat, index) => {
                        return (
                            <div key={index}>
                                <UserChat chat={chat} user={user} />
                            </div>
                        )
                    })}
                </Stack>
                <p>ChatBox</p>
            </Stack>
        )}
    </Container> 
    </> );
}
 
export default Chat;