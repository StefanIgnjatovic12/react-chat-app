import {
    StyledChatListItemsText,
    StyledChatListItemsContainer,
    StyledChatListItemsAvatar,
    StyledChatChatListSubtext, StyledOnlineIndicatorDot, StyledOfflineIndicatorDot
}
    from "../styles/ChatListItems.styled";
import {authRequestOptions} from "../../hooks/requestOptions";
import {useActiveConvo} from "../../context/ActiveConvoContext";
import {useEffect, useState} from "react";
import {useTogglerState} from "../../context/TogglerStateContext";


export default function ChatListItems({
                                          name,
                                          conv_partner_real_name,
                                          conv_id,
                                          text,
                                          avatar,
                                          real_avatar,
                                          index,
                                          coloredArray,
                                          is_online
                                          // togglerStateArray
                                      }) {
    const {activeConvo, setActiveConvo, messages, setMessages, headerConvo, setHeaderConvo} = useActiveConvo()
    const [changeColor, setChangeColor] = useState(false)
    const {togglerStateArray} = useTogglerState()

    let id = localStorage.getItem('currentUserID')
    //filter array which contains the state of the toggler for each convo to get
    //the one matching this specific ChatListItem
    console.log('Here')
    console.log(coloredArray)
    let revealed_status_individual_convo = togglerStateArray.filter(convo => convo.convo_id === conv_id)

    const handleClick = () => {

        //change all the values that signify whether a button is colored to false because we want to un-color all
        //buttons that were previously colored so not more than 1 at a time is colored
        coloredArray.forEach((convo, i) => coloredArray[i]['colored'] = false)
        //after they're all set to false, change the color of the 1 button clicked to purple
        coloredArray[index]['colored'] = !coloredArray[index]['colored']

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
        <StyledChatListItemsContainer onClick={handleClick} colored={coloredArray[index]['colored']}>
            <StyledChatListItemsAvatar

                avatar={revealed_status_individual_convo?.[0]?.['partner_revealed'] && revealed_status_individual_convo?.[0]?.['revealed']
                                            ? real_avatar
                                            : avatar}
                />


            <StyledChatListItemsText>
                <div>

                    {/*if both users revealed, then use partners real name > also check if real name and name are
                     over 10 characters long and shorten them if so*/}
                    {revealed_status_individual_convo?.[0]?.['partner_revealed'] && revealed_status_individual_convo?.[0]?.['revealed'] && conv_partner_real_name.length > 10
                        ? conv_partner_real_name.substring(0, 10) + "..."
                        : name.length > 10
                            ? name.substring(0, 10) + "..."
                            : name
                    }

                    {is_online
                        ? <StyledOnlineIndicatorDot> ●</StyledOnlineIndicatorDot>
                        : <StyledOfflineIndicatorDot> ●</StyledOfflineIndicatorDot>}

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