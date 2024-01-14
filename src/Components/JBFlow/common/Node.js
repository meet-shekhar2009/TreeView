import classNames from 'classnames';
import { useRef, useState } from 'react';
import { Card } from 'react-bootstrap';

let prevX = 0;
let prevY = 0;
let currX = 0;
let currY = 0;
const screen = document;
export default function Node({ nodeProps, children }) {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState(nodeProps.position);

  const dragMouseUp = (event) => {
    document.onmouseup = null;
    document.onmousemove = null;
  };

  const dragMouseMove = (event) => {
    event.preventDefault();

    prevX = currX - event.clientX;
    prevY = currY - event.clientY;
    currX = event.clientX;
    currY = event.clientY;

    const x = nodeRef.current.offsetLeft - prevX;
    const y = nodeRef.current.offsetTop - prevY;
    setPosition({ x, y });
  };

  const dragMouseDown = (event) => {
    currX = event.clientX;
    currY = event.clientY;
    screen.onmouseup = dragMouseUp;
    screen.onmousemove = dragMouseMove;
  };

  return (
    <div
      className={classNames('jb-wf-node', {
        diamond: nodeProps?.meta?.shape === 'diamond',
      })}
      onMouseDown={dragMouseDown}
      ref={nodeRef}
      style={{ top: position.y, left: position.x }}
    >
      <div
        className={classNames({
          'diamond-content': nodeProps?.meta?.shape === 'diamond',
        })}
      >
        {children}
      </div>
    </div>
  );
}
