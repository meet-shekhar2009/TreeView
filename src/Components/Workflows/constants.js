export const WORKFLOWS_ACTION = [
  { name: 'Select', icon: 'bi bi-table', id: 1, shape: 'rect' },
  { name: 'Insert', icon: 'bi bi-inboxes-fill', id: 2, shape: 'rect' },
  { name: 'Update', icon: 'bi bi-stickies-fill', id: 3, shape: 'rect' },
  { name: 'Delete', icon: 'bi bi-archive-fill', id: 4, shape: 'rect' },
  { name: 'truncate', icon: 'bi bi-x-diamond-fill', id: 5, shape: 'diamond' },
  { name: 'Alter', icon: 'bi bi-building', id: 6, shape: 'rect' },
];

export const nodeSelector = '.jb-wf-node';

export const ActionType = Object.freeze({
  MouseDown: 'mousedown',
  MouseUp: 'mouseup',
  MouseMove: 'mousemove',
});

export const ConnectionType = Object.freeze({
  Target: 'target',
  Source: 'source',
});

export const NodeShape = Object.freeze({
  Rectangle: 'rect',
  Diamond: 'diamond',
});
