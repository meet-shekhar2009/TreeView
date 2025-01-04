import { useRef } from 'react';
import './style.css';

export default function ResizableRectangle() {
  const divRef = useRef(null);
  let pos1 = 0;
  let pos2 = 0;
  let preHeight=0;
  let preWidth=0;

  function handleMouseMove(e) {
    const currWidth = e.clientX - pos1;
    const currHeight = e.clientY - pos2;
    divRef.current.style.width = preWidth + currWidth + 'px';
    divRef.current.style.height =
      preHeight + currHeight + 'px';
  }
  function handleMouseUp(e) {
    document.onmousemove = null;
    document.onmouseup = null;
  }

  function handleMouseDown(e) {
    pos1 = e.clientX;
    pos2 = e.clientY;
    
    preHeight=divRef.current.offsetHeight; 
    preWidth=divRef.current.offsetWidth;
    
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
