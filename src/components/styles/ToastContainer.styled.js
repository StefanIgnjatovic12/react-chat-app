import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {}
  .Toastify__toast {}
  .Toastify__toast-body {}
  .Toastify__progress-bar {}
  .Toastify__toast-theme--light {
    background-color: #404757;
    color: #F6F6F6;
    border-radius: 15px;
    font-family: "Quicksand Medium", serif;
    box-shadow: 0 2px 15px rgb(0 0 0 / 68%);
    text-align: center;
}
  .Toastify__progress-bar-theme--light {
    background-color: #726DFE;
}
  .Toastify__toast-icon {
    color: #726DFE
}
`;