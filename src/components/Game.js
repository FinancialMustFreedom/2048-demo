import React from "react";
import { useSelector } from "react-redux";

import Board from "./Board";
import Modal from "./Modal";
import { selectCurrentGameState, selectGrid } from "../reducers/selectors";

const Game = React.memo(({ restartGame, airDrop }) => {
  const grid = useSelector(selectGrid);
  const gameState = useSelector(selectCurrentGameState);
  const shouldShowModal = gameState === "won" || gameState === "lost";

  return (
    <div>
      {shouldShowModal && (
        <Modal airDrop={airDrop}>
          {gameState === "won" ? "You won!" : "You lost!"}
        </Modal>
      )}
      <Board grid={grid} />
    </div>
  );
});

export default Game;
