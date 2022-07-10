import {StyledChatLinkBar} from "./styles/ChatContainer.styled";
import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom";
import {authRequestOptions} from "../hooks/requestOptions";
import {useCreateNewChat} from "../context/CreateNewChatContext";

const StyledChatLinkIcon = styled.div`
  background-image: url(${props => props.icon});
  height: 1.875rem;
  width: 1.875rem;
  background-size: cover;
  background-position: top center;
  margin-top: 75%;
  cursor: pointer;

  :hover {
    filter: invert(69%) sepia(23%) saturate(126%) hue-rotate(185deg) brightness(84%) contrast(83%);
  }

  //  #B1B4BB
`

const StyledChatLinkIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60%;
  justify-content: flex-start;
  align-items: center;
`
export default function ChatLinkBar() {
    const {newChatCreated, setNewChatCreated} = useCreateNewChat()
    const navigate = useNavigate()
    return (
        <StyledChatLinkBar>
            <StyledChatLinkIconContainer>
                <StyledChatLinkIcon
                    icon={'/profile.png'}
                    onClick={() => navigate('/profile')}
                />
                <StyledChatLinkIcon
                  icon={'/newchatgray.png'}
                  onClick={() => {

                        fetch(`http://127.0.0.1:5000/api/create-new-chat/`, authRequestOptions('GET'))
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                //state in context that will be used to tell
                                //other components to re-render once a new chat is created
                                setNewChatCreated(newChatCreated + 1)
                            })
                            .catch(error => console.log(error))


                    }}
                />
                <StyledChatLinkIcon
                    icon={'/github.png'}

                />


                <StyledChatLinkIcon
                    icon={'/log-out.png'}
                    onClick={() => navigate('/signout')}
                />


            </StyledChatLinkIconContainer>
        </StyledChatLinkBar>
    )
}