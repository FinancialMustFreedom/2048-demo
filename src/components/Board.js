import React, { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectPoints, selectCurrent1024 } from '../reducers/selectors';

import { AnimateSharedLayout } from "framer-motion";

import Tile from "./Tile";
import {
  addTile,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
} from "../actions/boardActions";

const BoardContainer = styled.div`
  position: absolute;
  border-radius: 10px;
`;

const Div = styled.div`
  height: 410px;
  width: 410px;
  box-shadow: 0px 0px 10px 2px grey;
  border-radius: 10px;
`;

const Board = React.memo(({ grid }) => {
  const dispatch = useDispatch();

  console.log("=====> score: ", useSelector(selectPoints));
  if (useSelector(selectCurrent1024)) {
    console.log("====> 1024")
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowUp": {
          batch(() => {
            dispatch(moveUp());
            dispatch(addTile());
          });
          break;
        }
        case "ArrowDown": {
          batch(() => {
            dispatch(moveDown());
            dispatch(addTile());
          });
          break;
        }
        case "ArrowLeft": {
          batch(() => {
            dispatch(moveLeft());
            dispatch(addTile());
          });
          break;
        }
        case "ArrowRight": {
          batch(() => {
            dispatch(moveRight());
            dispatch(addTile());
          });
          break;
        }
        default: {
          break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <AnimateSharedLayout>
      <Div>
        <BoardContainer>
          {grid.map((tile) => (
            <Tile
              id={tile.id}
              key={tile.id}
              position={tile.position}
              value={tile.value}
              grid={grid}
            />
          ))}
        </BoardContainer>
      </Div>
    </AnimateSharedLayout>
  );
});

export default Board;
