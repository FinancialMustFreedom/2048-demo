import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { restartGame as restartGameAction } from "../actions/boardActions";
import {
  Modal as ZendeskModal,
  Footer,
  FooterItem,
} from "@zendeskgarden/react-modals";
import { Row, Col } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { selectCurrentGameState } from "../reducers/selectors";

const RestartButton = styled.button`
  background-color: rgb(204, 51, 64);
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 10px;
  box-sizing: border-box;
  font-weight: bolder;
  color: white;
  height: 40px;
  outline: none;
  box-shadow: none;

  &:hover {
    background-color: #8c232c;
    transition: border-color 0.25s ease-in-out 0s,
      box-shadow 0.1s ease-in-out 0s, background-color 0.25s ease-in-out 0s,
      color 0.25s ease-in-out 0s;
  }
  &:active {
    background-color: #650d14;
    transition: border-color 0.25s ease-in-out 0s,
      box-shadow 0.1s ease-in-out 0s, background-color 0.25s ease-in-out 0s,
      color 0.25s ease-in-out 0s;
  }
  &:focus {
    box-shadow: rgb(204 51 64 / 35%) 0px 0px 0px 3px;
  }
`;

const StyledBody = styled.body`
  text-align: center;
  font-size: 40px;
`;

const StyledFooter = styled(Footer)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Modal = () => {
  const gameState = useSelector(selectCurrentGameState);
  const text = gameState === "won" ? "You won!" : "You lost!";
  const dispatch = useDispatch();

  const restartGame = () => {
    dispatch(restartGameAction());
  };

  return (
    <Row>
      <Col textAlign="center">
        <ZendeskModal>
          <StyledBody>{text}</StyledBody>
          <StyledFooter>
            <FooterItem>
              <RestartButton onClick={restartGame} aria-label="restart">
                Try Again
              </RestartButton>
            </FooterItem>
          </StyledFooter>
        </ZendeskModal>
      </Col>
    </Row>
  );
};

export default Modal;
