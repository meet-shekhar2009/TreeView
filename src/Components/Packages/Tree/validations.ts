import { FIELD_OR_RENDER_VALIDATION_MESSAGE } from './constant';
import { NodeProps } from './types';

export const validateFieldAndRenderValues = ({
  currentNode,
  render,
}: NodeProps) => {
  if (currentNode && !currentNode.field && !render) {
    throw new Error(FIELD_OR_RENDER_VALIDATION_MESSAGE);
  }
};
