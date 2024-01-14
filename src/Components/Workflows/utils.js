import { nodeSelector } from './constants';
export const getNodeArea = (event) => {
  return event.target.getAttribute('data-node-area');
};

export const getConnectorType = (event) => {
  return event.target.getAttribute('data-jb-connector-type');
};

export const isTargetPoint = (event) => {
  return getConnectorType(event) === 'target';
};

export const isSourcePoint = (event) => {
  return getConnectorType(event) === 'source';
};

export const isConnector = (event) => {
  return getNodeArea(event) !== 'connector';
};

export const getNodeShape = (event) => {
  return event.target.closest(nodeSelector).getAttribute('data-jb-node-shape');
};
