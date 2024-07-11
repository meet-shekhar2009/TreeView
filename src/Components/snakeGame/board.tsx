import { useCallback, useEffect, useState } from 'react';
import Cell, { CellProps } from './cell';
import useSnake, { Snake } from './useSnake';
import { tail } from 'cypress/types/lodash';

interface Props {
  columns: number;
  rows: number;
}

export enum Direction {
  LEFT = 37,
  UP = 38,
  RIGHT = 39,
  DOWN = 40,
  NONE = 0,
}
let inter: NodeJS.Timer;
export default function Board(props: Props) {
  let [board, setBoard] = useState<CellProps[][]>([]);
  let [direction, setDirection] = useState(Direction.NONE);
  const initBoard = () => {
    let innerBoard = new Array<CellProps[]>(props.rows).fill([]);
    for (let row = 0; row < innerBoard.length; row++) {
      innerBoard[row] = new Array(props.columns)
        .fill(null)
        .map<CellProps>((v, col) => ({
          ColumnNo: col,
          RowNo: row,
          hasFood: false,
          isSnakeColumn: false,
          isHead: false,
          direction: 0,
        }));
    }
    generateFood(innerBoard);
    return innerBoard;
  };

  function getRandomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateFood(board: CellProps[][]) {
    const r = getRandomNumber(0, props.rows - 1);
    const c = getRandomNumber(0, props.columns - 1);
    try {
      board[r][c].hasFood = true;
    } catch (error) {
      debugger;
    }
  }
  const { snake, head, getKey, move, hasTouchedItself } = useSnake({
    col: 0,
    row: props.rows - 1,
  });

  const getPosition = (code: number) => {
    let pos: Snake | undefined;
    const value = [...snake.values()].at(-1);
    if (!value) {
      return null;
    }

    const { row, col } = value;
    switch (code) {
      case Direction.LEFT:
        if (direction == Direction.RIGHT) return null;
        pos = { row: row, col: col - 1 };
        break;
      case Direction.UP:
        if (direction == Direction.DOWN) return null;
        pos = { row: row - 1, col: col };
        break;
      case Direction.RIGHT:
        if (direction == Direction.LEFT) return null;
        pos = { row, col: col + 1 };
        break;
      case Direction.DOWN:
        if (direction == Direction.UP) return null;
        pos = { row: row + 1, col: col };
        break;
      default:
        return null;
        break;
    }
    return pos;
  };

  const handleMove = useCallback(
    (e: KeyboardEvent) => {
      const position = getPosition(e.keyCode);
      if (!position) return;
      if (
        position.col > props.columns - 1 ||
        position.col < 0 ||
        position.row > props.rows - 1 ||
        position.row < 0 ||
        hasTouchedItself([...snake.keys(), getKey(position)])
      ) {
        clearInterval(inter);
        const scr = localStorage.getItem('hScore');
        if (scr && snake.size > parseInt(scr)) {
          localStorage.setItem('hScore', snake.size.toString());
        }
        alert('game Over');
        window.location.reload();
        return;
      }
      if (position) {
        setDirection(e.keyCode);
      }
      move(position, board, generateFood);
    },
    [snake, board]
  );
  const hScore = localStorage.getItem('hScore');
  useEffect(() => {
    document.addEventListener('keydown', handleMove, true);
    if (direction !== Direction.NONE) {
      inter = setInterval(() => {
        handleMove({ keyCode: direction } as KeyboardEvent);
      }, 200);
    }
    return () => {
      document.removeEventListener('keydown', handleMove, true);
      clearInterval(inter);
    };
  }, [snake, board]);

  useEffect(() => {
    const intboard = initBoard();
    setBoard(intboard);
  }, []);

  return (
    <div className="snake-board">
      <div className="score">
        <div>Score: {snake.size}</div>
        <div>Highest Score: {hScore}</div>
      </div>

      {board.map((row, rIndex) => {
        return (
          <div key={`row-${rIndex}`} className="board-row">
            {row.map((column, cIndex) => {
              const hasKey = getKey({ col: cIndex, row: rIndex });
              column.isSnakeColumn = snake.has(hasKey);
              column.isHead = head == hasKey;

              return (
                <Cell
                  key={`col-${cIndex}-${rIndex}`}
                  {...column}
                  direction={direction}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
