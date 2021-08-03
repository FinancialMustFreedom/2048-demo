import { selectCurrentGameState } from "../selectors";

describe("selectors", () => {
  const generateGrid = (simpleGrid) => {
    let id = 1;
    return simpleGrid.map((row) => {
      return row.map((number) => {
        if (number === 0) {
          return {
            value: 0,
            id: null,
          };
        } else {
          return {
            value: number,
            id: id++,
          };
        }
      });
    });
  };

  describe("selectCurrentGameState()", () => {
    it("returns correct value when game is won", () => {
      const result = selectCurrentGameState({
        board: {
          grid: generateGrid([
            [2, 4, 8, 2048],
            [0, 8, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ]),
        },
      });

      expect(result).toBe("won");
    });

    it("returns correct value when game is lost", () => {
      const result = selectCurrentGameState({
        board: {
          grid: generateGrid([
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2],
          ]),
        },
      });
      expect(result).toBe("lost");
    });

    it("returns correct value when game is still active and is full", () => {
      const result = selectCurrentGameState({
        board: {
          grid: generateGrid([
            [2, 2, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2],
          ]),
        },
      });
      expect(result).toBe("active");
    });

    it("returns correct value if game is active and not full", () => {
      const result = selectCurrentGameState({
        board: {
          grid: generateGrid([
            [2, 2, 0, 0],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2],
          ]),
        },
      });
      expect(result).toBe("active");
    });

    it("returns correct value if game is still active and there are two numbers on the board", () => {
      const result = selectCurrentGameState({
        board: {
          grid: generateGrid([
            [0, 0, 0, 0],
            [4, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
          ]),
        },
      });
      expect(result).toBe("active");
    });
  });
});
