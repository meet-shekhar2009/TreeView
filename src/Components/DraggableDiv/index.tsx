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
  let x = 0,
    y = 0;

  const dragMouseUp = () => {
    document.onmouseup = null;
    document.onmousemove = null;
    setAttribute((k) => ({ ...k, isDragging: false }));
  };

  const dragMouseMove = (event: any) => {
    event.preventDefault();

    let xPos = x - event.clientX;
    let yPos = y - event.clientY;
    x = event.clientX;
    y = event.clientY;
    setDivPosition((ele) => ({
      ...ele,
      left: `${(elementRef.current as any).offsetLeft - xPos}px`,
      top: `${(elementRef.current as any).offsetTop - yPos}px`,
    }));
  };

  const dragMouseDown = (event: any) => {
    event.preventDefault();

    x = event.clientX;
    y = event.clientY;
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
