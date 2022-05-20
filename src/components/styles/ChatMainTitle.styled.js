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
export const StyledChatMainTitleText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`
export const StyledChatMainTitleSubtext = styled.div`
  margin-top: 5%;
  font-size: 14px;
  color: #B1B4BB;
`
export const StyledChatMainTitleAvatar = styled.div`
  background-image: url('data:image/png;base64,${props => props.avatar}');
  width: 17%;
  height: 80%;
  max-width: 100%;
  max-height: 100%;
  background-size: cover;
  background-position: top center;
  border-radius: 50%;
  align-self: center;
  margin-right: 5%;
  margin-bottom: 3%;
`


export const StyledChatMainTitleRevealButton = styled.div`
  border: 2px solid #7076FF;
  border-radius: 1rem;
  max-height: 30%;
  max-width: 23%;
  text-align: center;
  color: #7076FF;
  background-color: transparent;
  font-family: "Quicksand Medium", serif;
  overflow: hidden;
  padding: 0.75rem;
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

export const Test = styled.div`
height: 300px;
  width: 300px;
 
`