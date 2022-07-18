import styled, { css } from "styled-components";

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: ${props => props.min_height};
  max-height: 85vh;
  width: 25vw;
  padding: 1rem;
  border-radius: 25px;
  background-color: #404757;

`
export const SelectDropdown = styled.select`
  width: 70%;
  background-color: #404757;
  color: #f6f6f6;

  :required:invalid {
    color: #757575;
  }

  font-size: 15px;
  font-family: "Quicksand Medium", serif;
  border: none;
  border-bottom: 1px solid #4E5566;
  //border-radius: 0.625rem;
  margin-top: 5%;
  padding: 0.625rem 0.5rem 0.625rem 0;

  :hover {
    border-bottom: 1px solid #726DFE;
  }


  //remove default styling 
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  //
`
export const SelectOption = styled.option`
  :not(:checked) {
    color: #757575;
  }




`
export const LargeInputWrapper = styled.div`
  display: flex;
  width: 70%;
  margin-top: 1.5rem;
  border: 1px solid #4E5566;
  border-radius: 0.625rem;
  height: ${props => props.height};

  :hover {
    border: 1px solid #726DFE
  }

  :focus {
    border: 1px solid #726DFE
  }
`
export const LargeInputField = styled.textarea`
  background-color: transparent;
  border: 0;
  width: 100%;
  font-size: 15px;
  font-family: "Quicksand Medium", serif;
  color: #F6F6F6;
  padding: 0.625rem 0.5rem 0.625rem 0.5rem;

  ::placeholder {
    color: #757575
  }


  //remove default styling 
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;
  //
`

export const ImageUploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 1.5rem;
  border: 1px dashed #4E5566;
  border-radius: 0.625rem;
  max-height: ${props => props.height};
  min-height: 4rem;
  cursor: pointer;

  :hover {
    border: 1px dashed #726DFE
  }

  :focus {
    border: 1px dashed #726DFE
  }
`

export const AvatarSelectModalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;


`

export const AvatarSelectModalImage = styled.div`
  background-image: url(${props => props.avatar});
  background-size: cover;
  background-position: top center;
  background-color: transparent;
  cursor: pointer;
  height: 5rem;
  width: 5rem;
  margin: 5px;
  border-radius: 50%;
  
  ${({ avatarSelectedArray, index }) => {
        return css`
            opacity: ${avatarSelectedArray[index].selected ? '50%' : '100%'};
        `;
    }}
`
export const AvatarSelectModalButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 5rem;
  margin-top: 0.5rem;
  width: 50%;
  
`

export const AvatarSelectModalButton = styled.input`
  background-color: #726DFE;
  font-size: 13px;
  font-family: "Quicksand Medium", serif;
  border: none;
  color: #F6F6F6;
  border-radius: 0.625rem;
  padding: 0.625rem;
  width: 45%;

  :hover {
    background-color: #7F7AF8;
    cursor: pointer;
  }
`