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

export const FieldIconContainer = styled.div`
  display: flex;
  width: 70%;
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
  margin-top: ${props => props.margin_top };
  width: 70%;

  :hover {
    background-color: #7F7AF8;
    cursor: pointer;
  }
`

export const HaveAccount = styled.div`
  font-size: 15px;
  font-family: "Quicksand Medium", serif;
  color: #F6F6F6;
  margin-top: 1rem;
  span{
    color: #726DFE;
    margin-left: 5px
  }

`