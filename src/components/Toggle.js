import React from "react";
import styled from "styled-components";

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 42px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }

  &:hover {
    background-color: red;
    transition: border-color 0.25s ease-in-out 0s,
      box-shadow 0.1s ease-in-out 0s, background-color 0.25s ease-in-out 0s,
      color 0.25s ease-in-out 0s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      margin-left: 21px;
      transition: 0.2s;
    }
  }
  &:focus + ${CheckBoxLabel} {
    border: 2px solid rgb(204, 51, 64);
  }
`;

const Toggle = ({ onChange }) => {
  return (
    <div>
      <CheckBoxWrapper>
        <CheckBox
          id="checkbox"
          type="checkbox"
          onChange={onChange}
          aria-label="Toggle dark and light mode"
        />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
    </div>
  );
};

export default Toggle;
