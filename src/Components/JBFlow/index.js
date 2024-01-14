import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AddModel from './AddModel';
import Node from './common/Node';
import { WORKFLOWS_ACTION } from './Constants';
import classNames from 'classnames';

//import './styles.css';

let nodeMeta = null;
export default function WorflowView() {
  const [nodes, setNodes] = useState([]);
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');

  function getNode(data) {
    return {
      id: Date.now,
      data,
      meta: nodeMeta,
      position: {
        x: 0,
        y: 0,
      },
    };
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData('id', ev.target.id);
  }

  function drop(ev) {
    ev.preventDefault();
    const id = ev.dataTransfer.getData('id');
    const dataItem = WORKFLOWS_ACTION.find((k) => k.id == id);
    nodeMeta = dataItem;
    setShow(true);
  }

  function onSave() {
    setNodes((k) => [...k, getNode(text)]);
    setShow(false);
  }

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
          <Row
            className="header_createeditobject"
            style={{ marginTop: '24px' }}
          >
            <Col>
              <span className="heading_eachline">Workflow Builder</span>
            </Col>
          </Row>
          <Row>
            <Col className="p-0 svg-container">
              {nodes.map((node) => (
                <Node nodeProps={node} key={node.id}>
                  {node.data}
                </Node>
              ))}
              <svg onDrop={drop} onDragOver={allowDrop}>
                <defs>
                  <pattern
                    id="pattern-circles"
                    x="0"
                    y="0"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                  >
                    <circle
                      id="pattern-circle"
                      cx="10"
                      cy="10"
                      r="1.2"
                      fill="grays"
                    ></circle>
                  </pattern>
                </defs>
                <rect
                  id="rect"
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#pattern-circles)"
                ></rect>
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
    <Card
      className="m-1  jb-wf-node"
      draggable="true"
      onDragStart={drag}
      id={model.id}
    >
      <Card.Body className="p-2">
        <i className={classNames('p-10', model.icon)}></i> {model.name}
      </Card.Body>
    </Card>
  );
}
