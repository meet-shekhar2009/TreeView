import { useRef } from 'react';
import './style.css';

export default function ResizableRectangle() {
  const divRef = useRef(null);
  let pos1 = 0;
  let pos2 = 0;

  function handleMouseMove(e) {
    const currWidth = e.clientX - pos1;
    const currHeight = e.clientY - pos2;
    divRef.current.style.width = divRef.current.offsetWidth + currWidth + 'px';
    divRef.current.style.height =
      divRef.current.offsetHeight + currHeight + 'px';
  }
  function handleMouseUp(e) {
    document.onmousemove = null;
    document.onmouseup = null;
  }

  function handleMouseDown(e) {
    pos1 = e.clientX;
    pos2 = e.clientY;
    document.onmousemove = handleMouseMove;
    document.onmouseup = handleMouseUp;
  }

  return (
    <div ref={divRef} className="resizable-div-cointainer">
      <div className="point l-t"></div>
      <div className="point t-r"></div>
      <div className="point l-b"></div>
      <div className="point b-r" onMouseDown={handleMouseDown}></div>
    </div>
  );
}
