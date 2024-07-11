import { useState } from 'react';
import { CellProps } from './cell';

export interface Snake {
  row: number;
  col: number;
}

export default function useSnake(defaultPos: Snake) {
  const key = getKey(defaultPos);
  const snakeBody = new Map();
  snakeBody.set(key, defaultPos);
  const [snake, setSnake] = useState<Map<string, Snake>>(snakeBody);
  const [head, setHead] = useState(snakeBody.keys().next().value);

  function getKey(pos: Snake) {
    return `${pos.row}-${pos.col}`;
  }

  function hasTouchedItself(snake: string[]) {
    return (
      snake.filter((item, index) => snake.indexOf(item) !== index).length > 0
    );
  }
  function move(pos: Snake, board: CellProps[][], generateFood: Function) {
    const key = getKey(pos);
    const clonedMap = new Map([...snake]);
    clonedMap.set(key, pos);
    setHead(key);
    if (!board[pos.row][pos.col].hasFood) {
      const keyToDel = clonedMap.keys().next();
      clonedMap.delete(keyToDel.value);
    } else {
      board[pos.row][pos.col].hasFood = false;
      generateFood(board);
    }

    setSnake(clonedMap);
  }

  return { snake, head, getKey, move, hasTouchedItself };
}
