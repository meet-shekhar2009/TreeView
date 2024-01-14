import { useRef, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AddModel from './AddModel';
import Node from './common/Node';
import {
  WORKFLOWS_ACTION,
  ActionType,
  ConnectionType,
  NodeShape,
  nodeSelector,
} from './constants';
import Background from './Background';
import {
  isSourcePoint,
  isTargetPoint,
  isConnector,
  getNodeShape,
} from './utils';
import classNames from 'classnames';

import './styles.css';

let nodeMeta = null;
let connection = null;
let creatingEdge = false;

export default function WorflowView() {
  const [nodes, setNodes] = useState([]);
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [edges, setEdges] = useState([]);
  const [currentConnection, setCurrentConnection] = useState(null);
  const svgRef = useRef(null);

  function getNode(data) {
    return {
      id: Date.now(),
      data,
      meta: nodeMeta,
      position: {
        x: nodeMeta.x || 0,
        y: nodeMeta.y || 0,
      },
    };
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    const { height, width } = ev.target.getBoundingClientRect();
    ev.dataTransfer.setData('shape_width', width / 2);
    ev.dataTransfer.setData('shape_height', height / 2);
    ev.dataTransfer.setData('id', ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();

    var shape_width = parseInt(ev.dataTransfer.getData('shape_width'));
    var shape_height = parseInt(ev.dataTransfer.getData('shape_height'));
    const id = ev.dataTransfer.getData('id');

    const { x: shapeX, y: shapeY } = ev.target.getBoundingClientRect();
    const y = ev.clientY - shapeY - shape_height;
    const x = ev.clientX - shapeX - shape_width;

    const dataItem = WORKFLOWS_ACTION.find((k) => k.id == id);
    nodeMeta = { ...dataItem, x, y };
    setShow(true);
  }

  function onSave() {
    const id = Date.now();
    setNodes((k) => [...k, getNode(text)]);
    setText('');
    setShow(false);
  }

  const getXY = (event) => {
    const y =
      event.target.closest(nodeSelector).offsetTop + event.target.offsetTop + 5;
    const x =
      event.target.closest(nodeSelector).offsetLeft +
      event.target.offsetLeft +
      5;
    return { x, y };
  };

  const getDiamondXY = (event) => {
    const y =
      event.target.closest(nodeSelector).offsetTop + event.target.offsetTop / 2;
    const x =
      event.target.closest(nodeSelector).offsetLeft -
      event.target.offsetTop / 4;
    console.log(
      event.target.closest(nodeSelector).offsetTop,
      event.target.offsetTop,
      y
    );
    console.log(
      event.target.closest(nodeSelector).offsetLeft,
      event.target.offsetLeft,
      x
    );
    return { x, y };
  };

  function handleEdgeMouseMove(event, nodeProps) {
    if (!connection) return;
    const svg = svgRef.current.getBoundingClientRect();
    let x = event.clientX - svg.x;
    let y = event.clientY - svg.y;
    setConnection(ConnectionType.Target, x, y, nodeProps.id);
    setCurrentConnection(connection);
  }

  function setConnection(conType, x, y, id) {
    if (conType === ConnectionType.Target) {
      connection = {
        ...(connection || {}),
        targetX: x,
        targetY: y,
        targetId: id,
      };
    }
    if (conType === ConnectionType.Source) {
      connection = {
        ...(connection || {}),
        sourceX: x,
        sourceY: y,
        sourceId: id,
      };
    }
  }

  const checkForConnector = (event, nodeProps, mouseAction) => {
    let y = null;
    let x = null;

    if (mouseAction === ActionType.MouseMove && creatingEdge) {
      handleEdgeMouseMove(event, nodeProps);
      return true;
    }

    if (isConnector(event)) {
      setCurrentConnection(null);
      connection = null;
      creatingEdge = false;
      return false;
    }

    switch (mouseAction) {
      case ActionType.MouseDown:
        if (isSourcePoint(event)) {
          ({ x, y } = getXY(event));
          setConnection(ConnectionType.Source, x, y, nodeProps.id);
          setCurrentConnection(connection);
        }
        creatingEdge = true;

        break;

      case ActionType.MouseUp:
        if (connection && isTargetPoint(event)) {
          ({ x, y } =
            getNodeShape(event) === NodeShape.Diamond
              ? getDiamondXY(event)
              : getXY(event));
          setConnection(ConnectionType.Target, x, y, nodeProps.id);
          setEdges([...edges, { ...connection }]);
        }
        setCurrentConnection(null);
        connection = null;
        creatingEdge = false;
        break;
      default:
        break;
    }

    return true;
  };

  return (
    <Container fluid>
      <Row>
        <Col md lg={4}>
          <Col className="m-2 p-2 mt-4 workflows-actions-items-container">
            {WORKFLOWS_ACTION.map((k) => (
              <WorkflowsActionItems
                model={k}
                key={`wf-act-${k.id}`}
                drag={drag}
              />
            ))}
          </Col>
        </Col>
        <Col md lg={8}>
          <Row>
            <Col className="text-center">
              <h1>Workflow Builder {edges.length}</h1>
            </Col>
          </Row>
          <Row>
            <Col className="p-0 svg-container">
              {nodes.map((node) => (
                <Node
                  nodeProps={node}
                  checkForConnector={checkForConnector}
                  setEdges={setEdges}
                  key={node.id}
                >
                  {node.data}
                </Node>
              ))}
              <svg onDrop={drop} onDragOver={allowDrop} ref={svgRef}>
                <Background />
                {edges.map((k) => (
                  <EdgePath {...k} />
                ))}
                {currentConnection && currentConnection.targetId && (
                  <EdgePath {...currentConnection} />
                )}
              </svg>
            </Col>
          </Row>
        </Col>
      </Row>
      <AddModel {...{ show, setShow, text, setText, onSave }} />
    </Container>
  );
}

function WorkflowsActionItems({ model, drag }) {
  return (
    <Card className="m-1 p-1" draggable="true" onDragStart={drag} id={model.id}>
      <Card.Body className="p-2">
        <i className={classNames('p-10', model.icon)}></i> {model.name}
      </Card.Body>
    </Card>
  );
}
const EdgePath = (props) => {
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
