import boardReducer from "../boardReducer";
import {
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
} from "../../actions/boardActions";

describe("board reducer", () => {
  it("has the correct initial state", () => {
    const startingGrid = [
      [
        { value: 0, id: 1 },
        { value: 0, id: 2 },
        { value: 0, id: 3 },
        { value: 0, id: 4 },
      ],
      [
        { value: 0, id: 5 },
        { value: 0, id: 6 },
        { value: 0, id: 7 },
        { value: 0, id: 8 },
      ],
      [
        { value: 0, id: 9 },
        { value: 0, id: 10 },
        { value: 0, id: 11 },
        { value: 0, id: 12 },
      ],
      [
        { value: 0, id: 13 },
        { value: 0, id: 14 },
        { value: 0, id: 15 },
        { value: 0, id: 16 },
      ],
    ];
    const state = boardReducer(undefined, { type: "mockAction " });
    expect(state).toEqual({
      score: 0,
      bestScore: null,
      grid: expect.anything(),
    });

    const numbers = state.grid.reduce((accumulator, row) => {
      const nonZeros = row.filter((tile) => tile.value !== 0);
      accumulator.push(...nonZeros);
      return accumulator;
    }, []);

    const zeros = state.grid.reduce((accumulator, row) => {
      const zerosForRow = row.filter((tile) => tile.value === 0);
      accumulator.push(...zerosForRow);

      return accumulator;
    }, []);

    expect(numbers).toHaveLength(2);
    expect(zeros).toHaveLength(14);

    const twosOrFours = numbers.filter((tile) => {
      return tile.value === 2 || tile.value === 4;
    });
    expect(twosOrFours).toHaveLength(2);
  });

  describe("movement transitions", () => {
    const generateGrid = (simpleGrid) => {
      let id = 1;
      return simpleGrid.map((row) => {
        return row.map((number) => {
          return {
            value: number,
            id: id++,
          };
        });
      });
    };

    const readSimpleGrid = (complexGrid) =>
      complexGrid.map((row) => row.map((object) => object.value));

    describe("when moving left", () => {
      it("moves tile correctly when it should", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][3].id);
      });

      it("does not move the tile when it should not", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][0].id);
      });

      it("combines numbers when next to each other", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 2, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][1].id);
      });

      it("combines numbers when not next to each other", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 2, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][2].id);
      });

      it("does not combine three numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 2, 2, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 2, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][1].id);
        expect(result.grid[3][1].id).toBe(mockGrid[3][2].id);
      });

      it("combines 2 of 4 like numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 2, 2, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 4, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][1].id);
        expect(result.grid[3][1].id).toBe(mockGrid[3][3].id);
      });

      it("doesn't combine non-like numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 4, 2, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 4, 2, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][0].id);
        expect(result.grid[3][1].id).toBe(mockGrid[3][1].id);
        expect(result.grid[3][2].id).toBe(mockGrid[3][2].id);
      });

      it("does not combine three numbers non-like numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 4, 2, 8],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 2, 8, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][1].id);
        expect(result.grid[3][1].id).toBe(mockGrid[3][2].id);
        expect(result.grid[3][2].id).toBe(mockGrid[3][3].id);
      });

      it("updates the score", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 2, 2, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_LEFT,
          }
        );
        expect(result.score).toBe(4);
      });
    });

    describe("when moving right", () => {
      it("moves tile correctly when it should", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 2],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][0].id);
      });

      it("does not move the tile when it should not", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 2],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][3].id);
      });

      it("combines numbers when next to each other", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 2, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 4],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][2].id);
      });

      it("combines numbers when not next to each other", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 2, 0, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 4],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][1].id);
      });

      it("does not combine three numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 2, 2, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 2, 4],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][2].id);
        expect(result.grid[3][2].id).toBe(mockGrid[3][1].id);
      });

      it("combines 2 of 4 like numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 2, 2, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 4, 4],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][2].id);
        expect(result.grid[3][2].id).toBe(mockGrid[3][0].id);
      });

      it("doesn't combine non-like numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 4, 2, 4],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 4, 2, 4],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][3].id);
        expect(result.grid[3][1].id).toBe(mockGrid[3][1].id);
        expect(result.grid[3][2].id).toBe(mockGrid[3][2].id);
      });

      it("does not combine three numbers non-like numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [8, 4, 2, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 8, 4, 2],
        ]);

        expect(result.grid[3][3].id).toBe(mockGrid[3][2].id);
        expect(result.grid[3][2].id).toBe(mockGrid[3][1].id);
        expect(result.grid[3][1].id).toBe(mockGrid[3][0].id);
      });

      it("updates the score", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 2, 2, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_RIGHT,
          }
        );
        expect(result.score).toBe(4);
      });
    });

    describe("when moving up", () => {
      it("moves tile correctly when it should", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 2],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 2],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        expect(result.grid[0][3].id).toBe(mockGrid[3][3].id);
      });

      it("does not move the tile when it should not", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        expect(result.grid[0][0].id).toBe(mockGrid[0][0].id);
      });

      it("combines numbers when next to each other", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [4, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        expect(result.grid[0][0].id).toBe(mockGrid[3][0].id);
      });

      it("combines numbers when not next to each other", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [4, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        expect(result.grid[0][0].id).toBe(mockGrid[2][0].id);
      });

      it("does not combine three numbers", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [4, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        expect(result.grid[0][0].id).toBe(mockGrid[1][0].id);
        expect(result.grid[1][0].id).toBe(mockGrid[2][0].id);
      });

      it("combines 2 of 4 like numbers", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [4, 0, 0, 0],
          [4, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        expect(result.grid[0][0].id).toBe(mockGrid[1][0].id);
        expect(result.grid[1][0].id).toBe(mockGrid[3][0].id);
      });

      it("doesn't combine non-like numbers", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [4, 0, 0, 0],
          [8, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [2, 0, 0, 0],
          [4, 0, 0, 0],
          [8, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        expect(result.grid[1][0].id).toBe(mockGrid[1][0].id);
        expect(result.grid[2][0].id).toBe(mockGrid[2][0].id);
        expect(result.grid[0][0].id).toBe(mockGrid[0][0].id);
      });

      it("updates the score", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_UP,
          }
        );
        expect(result.score).toBe(4);
      });
    });

    describe("when moving down", () => {
      it("moves tile correctly when it should", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        expect(result.grid[0][0].id).toBe(mockGrid[3][0].id);
      });

      it("does not move the tile when it should not", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[3][0].id);
      });

      it("combines numbers when next to each other", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[2][0].id);
      });

      it("combines numbers when not next to each other", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[1][0].id);
      });

      it("does not combine three numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [2, 0, 0, 0],
          [4, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[2][0].id);
        expect(result.grid[2][0].id).toBe(mockGrid[1][0].id);
      });

      it("combines 2 of 4 like numbers", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [4, 0, 0, 0],
          [4, 0, 0, 0],
        ]);

        expect(result.grid[3][0].id).toBe(mockGrid[2][0].id);
        expect(result.grid[2][0].id).toBe(mockGrid[0][0].id);
      });

      it("doesn't combine non-like numbers", () => {
        const mockGrid = generateGrid([
          [0, 0, 0, 0],
          [4, 0, 0, 0],
          [8, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );

        expect(readSimpleGrid(result.grid)).toEqual([
          [0, 0, 0, 0],
          [4, 0, 0, 0],
          [8, 0, 0, 0],
          [2, 0, 0, 0],
        ]);

        expect(result.grid[1][0].id).toBe(mockGrid[1][0].id);
        expect(result.grid[2][0].id).toBe(mockGrid[2][0].id);
        expect(result.grid[3][0].id).toBe(mockGrid[3][0].id);
      });

      it("updates the score", () => {
        const mockGrid = generateGrid([
          [2, 0, 0, 0],
          [2, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0],
        ]);

        const result = boardReducer(
          {
            grid: mockGrid,
            score: 0,
            bestScore: null,
          },
          {
            type: MOVE_DOWN,
          }
        );
        expect(result.score).toBe(4);
      });
    });
  });
});
