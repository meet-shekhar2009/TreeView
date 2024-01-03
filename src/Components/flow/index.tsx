import { useEffect, useRef, useState } from 'react';
import './styles.css';
import classNames from 'classnames';
import { debugPort } from 'node:process';
export default function FlowView() {
  const defaultY = 68;
  const [svgContainerWidth, setSvgContainerWidth] = useState(0);
  const users = [
    {
      name: 'shekhar',
      email: 'meet.shekhar2009@gmmail.com',
    },
    {
      name: 'Himanshu',
      email: 'himanshu@gmail.com',
    },
    {
      name: 'Shilpi',
      email: 'Shilpi@gmail.com',
    },
    {
      name: 'Ravi',
      email: 'ravi@gmail.com',
    },
    {
      name: 'Manu',
      email: 'manu@gmail.com',
    },
    {
      name: 'stayam',
      email: 'stayam@gmail.com',
    },
    {
      name: 'Nutan',
      email: 'mishra.11.jan@gmmail.com',
    },
  ];

  // const svgRef = useRef(null);
  interface Edge {
    sourceId: number;
    targetId: number;
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
  }
  const [customer, setCustomer] = useState(
    users.map((k, i) => ({
      ...k,
      Position: { top: 0, left: 0 },
      isAdded: false,
      id: i,
    }))
  );

  const elerefs: any = {};
  const defaultPos = customer.reduce<any>((pre, curr) => {
    pre[curr.id.toString()] = curr.Position;
    elerefs[curr.id.toString()] = useRef(null);

    return pre;
  }, {});

  const [divPosition, setDivPosition] = useState(defaultPos);
  const [attribute, setAttribute] = useState({
    isDragging: false,
  });

  function allowDrop(ev: any) {
    ev.preventDefault();
  }

  function drag(ev: any) {
    console.log('drag start');
    const { height, width } = ev.target.getBoundingClientRect();
    ev.dataTransfer.setData('text', ev.target.id);
    ev.dataTransfer.setData('dimensions_width', width / 2);
    ev.dataTransfer.setData('dimensions_height', height / 2);
  }

  function drop(ev: any) {
    ev.preventDefault();
    var id = ev.dataTransfer.getData('text');
    var dimensions_width = parseInt(
      ev.dataTransfer.getData('dimensions_width')
    );
    var dimensions_height = parseInt(
      ev.dataTransfer.getData('dimensions_height')
    );

    console.log(typeof dimensions_width, typeof dimensions_height);

    const cust = customer.find((k) => k.id == id);
    if (cust) {
      cust.isAdded = true;

      const { x, y, width } = ev.target.getBoundingClientRect();
      setCustomer((k) => [...k]);
      setDivPosition((pos: any) => {
        pos[id] = {
          top: ev.clientY - y - dimensions_height,
          left: ev.clientX - x - dimensions_width,
        };
        return pos;
      });
    }
  }

  //===========================================================
  // const EdgePath = (props: Edge) => {
  //   const customPath = `M${props.sourceX} ${props.sourceY} Q${props.sourceX} ${
  //     (props.sourceY + props.targetY) / 2
  //     }, ${props.targetX} ${props.targetY}`;

  const EdgePath = (props: Edge) => {
    const customPath = `M${props.sourceX},${props.sourceY}L ${props.targetX},${props.targetY}`;

    return (
      <path
        id={`${props.sourceId}-${props.targetId}`}
        d={customPath}
        fill="none"
        stroke="#555454"
        stroke-width="1"
      ></path>
    );
  };

  const [edges, setEdges] = useState<Edge[]>([]);
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let connection: Edge;

  const dragMouseUp = (event: any) => {
    if (event.target.classList.contains('connector')) {
      const id = getId(event);
      let y = event.target.parentElement.offsetTop + event.target.offsetTop + 5;
      let x =
        event.target.parentElement.offsetLeft + event.target.offsetLeft + 5;
      connection = {
        ...(connection || {}),
        targetX: x,
        targetY: y,
        targetId: parseInt(id),
      };

      setEdges([...edges, connection]);
      return;
    }
    document.onmouseup = null;
    document.onmousemove = null;
    setAttribute((k) => ({ ...k, isDragging: false }));
  };
  function getId(event: any) {
    return event.target.id !== ''
      ? event.target.id
      : event.target.parentElement.id;
  }
  const dragMouseMove = (event: any) => {
    event.preventDefault();
    const id = getId(event);
    if (!id) return;
    const elementRef = elerefs[id].current;
    pos1 = pos3 - event.clientX;
    pos2 = pos4 - event.clientY;
    pos3 = event.clientX;
    pos4 = event.clientY;

    const tp = elementRef.offsetTop - pos2;
    const lft = elementRef.offsetLeft - pos1;

    setDivPosition((ele: any) => ({
      ...ele,
      [id]: {
        top: tp,
        left: lft,
      },
    }));
  };

  const dragMouseDown = (event: any) => {
    event.preventDefault();
    if (event.target.classList.contains('connector')) {
      const id = getId(event);
      let y = event.target.parentElement.offsetTop + event.target.offsetTop + 5;
      let x =
        event.target.parentElement.offsetLeft + event.target.offsetLeft + 5;
      console.log(
        event.target.closest('.items').offsetLeft,
        event.target.parentElement.offsetLeft
      );

      connection = {
        ...(connection || {}),
        sourceX: x,
        sourceY: y,
        sourceId: parseInt(id),
      };

      document.onmouseup = dragMouseUp;
      return;
    }

    pos3 = event.clientX;
    pos4 = event.clientY;
    document.onmouseup = dragMouseUp;
    document.onmousemove = dragMouseMove;

    setAttribute((k) => ({ ...k, isDragging: true }));
  };

  const Card = (k: any, i: number, cssstyle: Object = {}) => {
    return (
      <div
        key={k.id}
        id={k.id.toString()}
        draggable="true"
        onDragStart={drag}
        style={{ ...cssstyle, ...divPosition[k.id] }}
        className="items"
        ref={elerefs[k.id]}
      >
        <div>{k.name}</div>
        {k.email && <div>{k.email}</div>}
      </div>
    );
  };

  const CardView = (k: any, i: number, cssstyle: Object = {}) => (
    <div
      key={k.id}
      id={k.id.toString()}
      style={divPosition[k.id]}
      className={classNames('items', { drag: attribute.isDragging })}
      onMouseDown={dragMouseDown}
      ref={elerefs[k.id]}
    >
      <div className="connector left"></div>
      <div>{k.name}</div>
      {k.email && <div>{k.email}</div>}
      <div className="connector right" onClick={(e) => {}}></div>
    </div>
  );

  return (
    <div>
      <h1>Flow</h1>
      <div className="conatiner-items">
        {customer.filter((k) => !k.isAdded).map((k, i) => Card(k, i))}
      </div>
      <div className="svg-container">
        {customer
          .filter((k) => k.isAdded)
          .map((k, i) => CardView(k, i, { top: 80 * i }))}
        <svg width="100" height="100" onDrop={drop} onDragOver={allowDrop}>
          {edges.map((k) => (
            <EdgePath {...k} />
          ))}
        </svg>
      </div>
    </div>
  );
}
