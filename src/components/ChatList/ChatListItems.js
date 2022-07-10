import {
    StyledChatListItemsText,
    StyledChatListItemsContainer,
    StyledChatListItemsAvatar,
    StyledChatChatListSubtext
}
    from "../styles/ChatListItems.styled";
import {authRequestOptions} from "../../hooks/requestOptions";
import {useActiveConvo} from "../../context/ActiveConvoContext";
import {useEffect, useState} from "react";


export default function ChatListItems({name,conv_partner_real_name, conv_id, text, avatar, index, coloredArray, togglerStateArray}) {
    const {activeConvo, setActiveConvo, messages, setMessages, setHeaderConvo} = useActiveConvo()
    const [changeColor, setChangeColor] = useState(false)


    let id = localStorage.getItem('currentUserID')
    //filter array which contains the state of the toggler for each convo to get
    //the one matching this specific ChatListItem
    let revealed_status_individual_convo = togglerStateArray.filter(convo => convo.convo_id === conv_id)

    const handleClick = () => {
        //change all the values that signify whether a button is colored to false because we want to un-color all
        //buttons that were previously colored so not more than 1 at a time is colored
        coloredArray.forEach((convo, i) => coloredArray[i] = false)
        //after they're all set to false, change the color of the 1 button clicked to purple
        coloredArray[index] = !coloredArray[index]

        fetch(`http://127.0.0.1:5000/api/user-conversation-partner/${id}/${name}`,
            authRequestOptions(('GET')))
            .then(response => response.json())
            .then(data => {
                // console.log('Data from clicking convo tab:')
                // console.log(data[0])

                //set activeConvo  the ID of the convo clicked on the left
                setActiveConvo(data[0].convo_id)
                //use [0] because only 1 convo is returned in the data
                setMessages(data[0].messages)
                setHeaderConvo(data[0])

            })
            .catch(error => console.log(error))
    }
    return (
        <StyledChatListItemsContainer onClick={handleClick} colored={coloredArray[index]}>
            <StyledChatListItemsAvatar avatar={avatar}/>
            <StyledChatListItemsText>
                <div>

                    {revealed_status_individual_convo[0]['revealed'] ? conv_partner_real_name : name}
                </div>
                <StyledChatChatListSubtext>

                    {
                        text.length > 15
                        ? text.substring(0, 15) + "..."
                        : text
                    }
                </StyledChatChatListSubtext>
            </StyledChatListItemsText>
        </StyledChatListItemsContainer>
    )
}