import { Box, Modal, ModalOwnProps, Typography } from "@mui/material";
import styled from "styled-components";

interface IModal extends ModalOwnProps {
  title?: string;
}
function BaseModal({ title, children, ...props }: IModal) {
  return (
    <Modal {...props}>
      <StyledBox>
        <Typography variant="h5">{title}</Typography>
        {children}
      </StyledBox>
    </Modal>
  );
}

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400;
  background-color: white;
  border: 2px solid #000;
  padding: 10px 20px;
`;

export default BaseModal;
