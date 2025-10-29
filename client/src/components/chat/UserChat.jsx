import { Stack } from "react-bootstrap";
import { useFetchRecipientUser } from "../../hooks/UseFetchRecipient";
import avatar from "../../assets/avatar.svg";

const UserChat = ({chat, user}) => {
    const {recipientUser} = useFetchRecipientUser(chat, user);
    
    return <Stack 
    direction="horizontal"
    gap={3} 
    className="user-card align-items-center p-2 justify-content-between"
    role="button">
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} height="35px" />
            </div>
            <div className="text-content">
                <div className="name">{recipientUser?.name}</div>
                <div className="text">Text Message</div>
            </div>
        </div>

        <div className="d-flex flex-column align-items-end">
            <div className="date">
                10/12/2025
            </div>
            <div className="this-user-notifications">2</div>
            <div className="user-online"></div>
        </div>
    </Stack>;
}
 
export default UserChat;