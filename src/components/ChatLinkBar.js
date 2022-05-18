import {StyledChatLinkBar} from "./styles/ChatContainer.styled";
import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom";

const StyledChatLinkIcon = styled.div`
  background-image: url(${props => props.icon});
  height: 1.875rem;
  width: 1.875rem;
  background-size: cover;
  background-position: top center;
  margin-top: 75%;
  cursor: pointer;
  :hover{
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
    const navigate = useNavigate()
    return (
        <StyledChatLinkBar>
            <StyledChatLinkIconContainer>
                <StyledChatLinkIcon
                    icon={'/profile.png'}
                    onClick={()=> navigate('/profile')}
                />
                <StyledChatLinkIcon
                    icon={'/github.png'}
                /><StyledChatLinkIcon
                icon={'/log-out.png'}
                onClick={() => navigate('/signout')}
            />
            </StyledChatLinkIconContainer>
        </StyledChatLinkBar>
    )
}