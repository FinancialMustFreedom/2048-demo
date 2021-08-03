import React from "react";
import styled from "styled-components";

import { motion } from "framer-motion";

const StyledContent = styled.div`
  font-size: 40px;
  margin-top: 25px;
  opacity: 1 !important;
`;

const getColor = (theme, value) => {
  return theme.tiles[value];
};

const StyledTile = styled(motion.div)`
  border: 5px solid #4a4e69;
  display: block;
  background-color: ${({ value, theme }) => getColor(theme, value)};
  width: 100px;
  height: 100px;
  text-align: center;
  position: absolute;
  border-radius: 6px;

  top: ${({ top }) => `${top}px`};
  left: ${({ left }) => `${left}px`};
`;

const Tile = React.memo(({ grid, id, value, position }) => {
  const top = Math.floor(position / 4) * 100;
  const left = Math.floor(position % 4) * 100;

  return (
    <StyledTile
      value={value}
      layoutId={`tile-${id}`}
      initial={{ visibility: "visible", opacity: 1 }}
      top={top}
      left={left}
    >
      {value !== 0 && (
        <StyledContent>{value === 0 ? null : value}</StyledContent>
      )}
    </StyledTile>
  );
});

export default Tile;
