import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: #577bf9;
  color: #ffffff;
`;

function Button({ buttonTitle, onClickFn, otherClassNames, buttonType }) {
  return (
    <StyledButton
      className={`${otherClassNames} flex flex-wrap rounded-lg p-3 font-bold shadow-md hover:shadow-xl justify-center`}
      onClick={onClickFn}
      type={buttonType}
    >
      {buttonTitle}
    </StyledButton>
  );
}

export default Button;
