import { useState } from 'react';

export default function Coordinates() {
  const [position, setPosition] = useState({
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    offsetX: 0,
    offsetY: 0,
    offsetLeft: 0,
    offsetTop: 0,
    offsetRight: 0,
    offsetBottom: 0,
    screenX: 0,
    screenY: 0,
    boxHeight: 0,
    boxWidth: 0,
  });

  return (
    <div
      style={{
        height: '100vh',
        width: '100wv',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '400px',
          height: '300px',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid silver',
          flexWrap: 'wrap',
        }}
        onClick={(e) => {
          setPosition({
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
            pageX: e.pageX,
            pageY: e.pageY,
            offsetLeft: e.target.offsetLeft,
            offsetTop: e.target.offsetTop,
            offsetRight: e.pageX - e.target.offsetLeft + e.target.offsetWidth,
            boxHeight: e.target.offsetHeight,
            boxWidth: e.target.offsetWidth,
            offsetX: e.nativeEvent.offsetX,
            offsetY: e.nativeEvent.offsetY,
          });
        }}
      >
        {Object.entries(position).map(([name, value]) => {
          return (
            <div style={{ width: '48%' }} key={name} className="box-conatiner">
              {name} : {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
