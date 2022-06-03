import styled from "styled-components";


export const StyledChatMainTitle = styled.div`
  border-bottom-color: #575D6B;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  height: 12%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Quicksand Medium", serif;
  color: #F6F6F6;
`

export const StyledChatMainTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  width: 90%;
  height: 80%;
  margin-left: 5%;
`
export const StyledChatMainTitleTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const StyledChatMainTitleSubtext = styled.div`
  margin-top: 5%;
  font-size: 14px;
  color: #B1B4BB;
`
export const StyledChatMainTitleAvatar = styled.div`
  background-image: url('data:image/png;base64,${props => props.avatar}');
  width: 3.5rem;
  height: 3.2rem;
  max-width: 100%;
  max-height: 100%;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
  align-self: center;
  margin-right: 5%;
  margin-bottom: 10%;
`
export const StyledChatMainTitleAvatarTextContainer = styled.div`
  display: flex;
  height: 100%;

`
export const StyledChatMainTitleButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 25%;
  max-height: 100%;
`
export const StyledChatMainTitleButton = styled.div`
  border: 2px solid #7076FF;
  border-radius: 1rem;
  max-height: 100%;
  width: 30%;
  max-width: 50%;
  text-align: center;
  font-size: 15px;
  color: #7076FF;
  background-color: transparent;
  font-family: "Quicksand Medium", serif;
  overflow: hidden;
  padding: 0.5rem;
  margin-top: ${props => props.margin_top};
  margin-bottom: ${props => props.margin_bottom};
  position: relative;
  text-decoration: none;
  transition: .2s transform ease-in-out;
  will-change: transform;
  z-index: 0;
  cursor: pointer;

  &::after {
    background-color: #7076FF;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translate(-100%, 0) rotate(10deg);
    transform-origin: top left;
    transition: .2s transform ease-out;
    will-change: transform;
    z-index: -1;
  }


  &:hover::after {
    transform: translate(0, 0);
  }

  &:hover {
    border: 2px solid transparent;
    color: white;
    transform: scale(1.05);
    will-change: transform;
  }
`
export const AccessDeniedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Quicksand Medium", serif;
  font-size: 16px;
`
export const AccessDeniedMessage = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: white;

`
export const AccessDeniedImage = styled.div`
  background-image: url(${props => props.image});
  height: 7.5rem;
  width: 7.5rem;
  background-size: cover;
  background-position: top center;
`

export const TogglerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`

export const StyledChatMainTitlePopup = styled.div`
  display: inline-block;
  color: #F6F6F6;
  font-size: 11px;
  font-family: "Quicksand Medium", serif;
  padding: 0.5rem;
  border-radius: 10px;
  background-color: #586074;
  box-shadow: 0px 10px 5px -7px #2c303a, 5px 5px 15px 5px rgba(99, 108, 131, 0);

`

export const StyledChatMainTitleClickableIcon = styled.div`
  background-image: url(${props => props.icon});
  width: 25px;
  height: 25px;
  
  margin-bottom: 3px;
  background-size: cover;
  background-position: top center;
  align-self: center;
  color: #F6F6F6;
  cursor: pointer;
`