import styled from "styled-components";

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: ${props => props.min_height};
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
  padding: 0.625rem 0.5rem 0.625rem 0.5rem;

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
  height: ${props => props.height};

  :hover {
    border: 1px dashed #726DFE
  }

  :focus {
    border: 1px dashed #726DFE
  }
`