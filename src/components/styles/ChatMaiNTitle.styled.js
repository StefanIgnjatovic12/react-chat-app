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
  align-items: center;
  background-color: transparent;
  width: 40%;
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
  margin-left: 5%;
  margin-bottom: 3%;
`
