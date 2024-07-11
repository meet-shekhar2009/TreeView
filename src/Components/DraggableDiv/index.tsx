import { useRef, useState } from 'react';
import './style.css';
import classNames from 'classnames';
export default function DraggableDiv() {
  const [divPosition, setDivPosition] = useState({
    top: '0px',
    left: '0px',
  });
  const [attribute, setAttribute] = useState({
    isDragging: false,
  });
  const elementRef = useRef(null);
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  const dragMouseUp = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    setAttribute((k) => ({ ...k, isDragging: false }));
  };

  const dragMouseMove = (event: any) => {
    event.preventDefault();

    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;
    setDivPosition((ele) => ({
      ...ele,
      top: `${(elementRef.current as any).offsetTop - pos2}px`,
      left: `${(elementRef.current as any).offsetLeft - pos1}px`,
    }));
  };

  const dragMouseDown = (event: any) => {
    event.preventDefault();

    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = dragMouseUp;
    document.onmousemove = dragMouseMove;

    setAttribute((k) => ({ ...k, isDragging: true }));
  };

  return (
    <div
      ref={elementRef}
      style={divPosition}
      className={classNames('dragable', { drag: attribute.isDragging })}
    >
      <header id="dragzone" onMouseDown={dragMouseDown}>
        <div className="wrapper">test1</div>
      </header>
    </div>
  );
}
