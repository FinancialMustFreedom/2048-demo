export const ADD_TILE = "ADD_TILE";
export const MOVE_DOWN = "MOVE_DOWN";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_UP = "MOVE_UP";
export const RESTART_GAME = "RESTART_GAME";

export const addTile = () => ({
  type: ADD_TILE,
});

export const moveLeft = () => ({
  type: MOVE_LEFT,
});

export const moveRight = () => ({
  type: MOVE_RIGHT,
});

export const moveUp = () => ({
  type: MOVE_UP,
});

export const moveDown = () => ({
  type: MOVE_DOWN,
});

export const restartGame = () => ({
  type: RESTART_GAME,
});
