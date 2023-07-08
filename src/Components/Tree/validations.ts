import { FIELD_OR_RENDER_VALIDATION_MESSAGE } from './constant';
import { NodeProps } from './types';

export const validateFieldAndRenderValues = <T extends {}>({
  currentNode,
  render,
}: NodeProps<T>) => {
  if (currentNode && !currentNode.field && !render) {
    throw new Error(FIELD_OR_RENDER_VALIDATION_MESSAGE);
  }
};
