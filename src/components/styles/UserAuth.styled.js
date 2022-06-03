import styled from "styled-components";

export const Background = styled.div`
  display: flex;
  height: 100vh;
  background-color: #A2A9C0;
  justify-content: center;
  align-items: center;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: ${props => props.min_height};
  width: 15vw;
  padding: 1rem;
  border-radius: 25px;
  background-color: #404757;
  box-shadow: 0 2px 15px rgb(0 0 0 / 68%)
`
export const FormTitle = styled.div`
  font-family: "Quicksand Medium", serif;
  font-size: 20px;
  color: #F6F6F6;
  text-shadow: -1px 1px 0px rgba(255, 255, 255, 0.1), 1px -1px 0px rgba(0, 0, 0, 0.4);
  opacity: 0.4;
  margin-bottom: 1rem;
 
`
export const InputField = styled.input`
  background-color: transparent;
  font-size: 15px;
  font-family: "Quicksand Medium", serif;
  height: 50%;
  width: 80%;
  border: none;
  outline: none;
  color: #F6F6F6;
  padding: 0.625rem 0 0.625rem 0;

  ::placeholder {
    color: #757575
  }
`
export const Icon = styled.div`
  background-image: url(${props => props.icon});
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-bottom: 3px;
  background-size: cover;
  background-position: top center;
  align-self: center;
  color: #F6F6F6;
`

export const InputWrapper = styled.div`
  display: flex;
  width: ${props => {
    if (props.width) {
      return props.width
    } else {
      return '70%'
    }
  }};
  margin-top: ${props => {
    if (props.margin_top) {
      return props.margin_top
    }
  }};
  border-bottom: 1px solid #4E5566;
  margin-bottom: ${props => props.margin_bottom};

  :hover {
    border-bottom: 1px solid #726DFE
  }

  :focus {
    border-bottom: 1px solid #726DFE
  }

`

export const Button = styled.input`
  background-color: #726DFE;
  font-size: 13px;
  font-family: "Quicksand Medium", serif;
  border: none;
  color: #F6F6F6;
  border-radius: 0.625rem;
  padding: 0.625rem;
  width: 70%;

  :hover {
    background-color: #7F7AF8;
    cursor: pointer;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 5rem;
  margin-top: 1rem;
  width: 100%;
`
export const HaveAccount = styled.div`
  font-size: 14px;
  font-family: "Quicksand Medium", serif;
  color: #F6F6F6;
  margin-top: 0.5rem;

  span {
    color: #726DFE;
    margin-left: 5px
  }

`

export const ErrorMessageText = styled.div`
  color: #ff4d4d;,
  font-family: "Quicksand Medium", serif;
`