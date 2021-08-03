import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';

import Game from './Game';
import github from './github.png';
import GlobalStyle from '../GlobalStyle';
import { lightTheme, darkTheme } from './Themes';
import { restartGame as restartGameAction } from '../actions/boardActions';
import { selectPoints } from '../reducers/selectors';
import Toggle from './Toggle';

const AboveGame = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: -85px;
  max-width: 400px;
  height: 100%;
`;

const BodyDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  background-repeat: repeat-x;
  background-attachment: fixed;
`;

const Container = styled.div``;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 400px;
`;

const RestartButton = styled.button`
  background-color: rgb(204, 51, 64);
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 10px;
  box-sizing: border-box;
  font-weight: bolder;
  color: white;
  height: 50px;
  width: 110px;
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

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid grey;
  position: relative;
  float: right;
  padding: 5px;
  border-radius: 10px;
  height: 80px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
`;

const StyledGame = styled(Game)`
  background-color: red;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
`;

const StyledH1 = styled.h1`
  font-family: Helvetica;
  text-align: center;
  font-size: 132px;
  color: '#ff007f';
`;

const StyledH3 = styled.h3`
  font-size: 20px;
  margin: 0;
  padding: 0;
`;

const StyledH4 = styled.h4`
  font-size: 15px;
  margin: 0;
`;

const TextDiv = styled.div``;

const TitleContainer = styled.div`
  display: flex;
`;

const ToggleDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const UnderGame = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  justify-content: center;
  align-items: center;
`;

const App = React.memo(() => {
  const score = useSelector(selectPoints);
  const dispatch = useDispatch();
  const [theme, setTheme] = useState('light');

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const restartGame = () => {
    dispatch(restartGameAction());
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <BodyDiv>
        <Container>
          <GlobalStyle />
          <TextDiv>
            <HeaderDiv>
              <TitleContainer>
                <StyledH1>2048</StyledH1>
              </TitleContainer>
              <ScoreContainer>
                <StyledH3>SCORE</StyledH3>
                <StyledH4>{score}</StyledH4>
              </ScoreContainer>
            </HeaderDiv>
            <AboveGame>
              <p>
                Join the numbers and get to the <strong>2048 tile!</strong>
              </p>
              <ToggleDiv>
                <Toggle onChange={themeToggler}>Switch Theme</Toggle>
              </ToggleDiv>
            </AboveGame>
          </TextDiv>
          <StyledGame restartGame={restartGame} />
          <UnderGame>
            <RestartButton
              type="submit"
              onClick={restartGame}
              aria-label="Restart"
            >
              New Game
            </RestartButton>
            <a
              href="https://github.com/sandylcruz/2048"
              target="_blank"
              rel="noreferrer"
            >
              <img src={github} alt="github" width="70px"></img>
            </a>
          </UnderGame>
        </Container>
      </BodyDiv>
    </ThemeProvider>
  );
});

export default App;
