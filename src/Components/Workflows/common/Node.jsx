import { useRef, useState } from 'react';
import classNames from 'classnames';
import { ActionType } from '../constants';

let prevX = 0;
let prevY = 0;
let currX = 0;
let currY = 0;
const screen = document;

export default function Node({ nodeProps, checkForConnector, children }) {
  const nodeRef = useRef(null);
  const [position, setPosition] = useState(nodeProps.position);

  const dragMouseUp = (event) => {
    checkForConnector(event, nodeProps, ActionType.MouseUp);

    document.onmouseup = null;
    document.onmousemove = null;
  };

  const dragMouseMove = (event) => {
    event.preventDefault();
    if (checkForConnector(event, nodeProps, ActionType.MouseMove)) {
      return;
    }

    prevX = currX - event.clientX;
    prevY = currY - event.clientY;
    currX = event.clientX;
    currY = event.clientY;

    const x = nodeRef.current.offsetLeft - prevX;
    const y = nodeRef.current.offsetTop - prevY;
    console.log('node moving');
    setPosition({ x, y });
  };

  const dragMouseDown = (event) => {
    screen.onmouseup = dragMouseUp;
    screen.onmousemove = dragMouseMove;

    if (checkForConnector(event, nodeProps, ActionType.MouseDown)) {
      return;
    }

    currX = event.clientX;
    currY = event.clientY;
  };

  return (
    <div
      className={classNames('jb-wf-node', {
        diamond: nodeProps?.meta?.shape === 'diamond',
      })}
      data-jb-node-shape={nodeProps?.meta?.shape}
      onMouseDown={dragMouseDown}
      ref={nodeRef}
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="connector left"
        data-node-area="connector"
        data-jb-connector-type="target"
      ></div>
      <div
        className="connector top"
        data-node-area="connector"
        data-jb-connector-type="target"
      ></div>
      <div
        className={classNames({
          'diamond-content': nodeProps?.meta?.shape === 'diamond',
        })}
      >
        {children}
      </div>
      <div
        className="connector right"
        data-node-area="connector"
        data-jb-connector-type="source"
      ></div>
      <div
        className="connector bottom"
        data-node-area="connector"
        data-jb-connector-type="source"
      ></div>
    </div>
  );
}
