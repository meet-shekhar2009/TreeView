import classNames from 'classnames';
import { Snake } from './useSnake';
import { Direction } from './board';

export interface CellProps {
  isSnakeColumn: boolean;
  isHead: boolean;
  hasFood: boolean;
  ColumnNo: number;
  RowNo: number;
  direction: number;
}

export default function Cell(props: CellProps) {
  return (
    <div
      className={classNames('board-cell', {
        'snake-cell': props.isSnakeColumn,
        'snake-food': props.hasFood,
        'snake-head': props.isHead,
        'snake-head-up': props.isHead && props.direction === Direction.UP,
        'snake-head-down': props.isHead && props.direction === Direction.DOWN,
        'snake-head-left': props.isHead && props.direction === Direction.LEFT,
        'snake-head-right': props.isHead && props.direction === Direction.RIGHT,
      })}
    >
      {props.isHead && (
        <>
          <div className="snake-eye"></div>
          <div className="snake-eye"></div>
        </>
      )}
    </div>
  );
}
