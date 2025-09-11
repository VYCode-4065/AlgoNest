import React from "react";
import styled from "styled-components";

const StyledBtn = ({ children }) => {
  return (
    <StyledWrapper>
      <button className="btn flex items-center gap-2">{children}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    transition: all 0.3s ease-in-out;
    font-family: "Dosis", sans-serif;
  }

  .btn {
    min-width: 120px;
    padding: 0 15px;
    height: 40px;
    border-radius: 50px;
    background-image: linear-gradient(
      76deg,
      #180161 0%,
      rgba(219, 15, 100, 1) 100%
    );
    box-shadow: 0 20px 30px -6px #180161;
    outline: none;
    cursor: pointer;
    border: none;
    font-size: 1.1rem;
    color: white;
  }

  .btn:hover {
    transform: translateY(3px);
    box-shadow: none;
  }

  .btn:active {
    opacity: 0.5;
  }
`;

export default StyledBtn;
