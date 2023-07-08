import { NodeTemplatePlaceholderProps } from '../types';

import { Children, cloneElement } from 'react';
import { getBoolVal } from '../utility';
const ItemTemplatePlaceholder = ({
  isEditable,
  showSection,
  isAddNewNode,
  children,
}: NodeTemplatePlaceholderProps) => {
  return (
    <>
      {/* <span>
        {getBoolVal({ isEditable }) +
          getBoolVal({ showSection }) +
          getBoolVal({ isAddNewNode })}
      </span> */}
      {isEditable && !showSection && !isAddNewNode && (
        <span className="node-container editable">{children}</span>
      )}
      {isEditable && showSection && !isAddNewNode && (
        <>
          <span className="node-container editable">{children}</span>
          <span className="node-container child-node-margin-left">
            {Children.map(children, (child) =>
              cloneElement(child, { ...child.props, dataItem: null })
            )}
          </span>
        </>
      )}
      {!isEditable && showSection && !isAddNewNode && (
        <>
          <span className="node-container editable">{children}</span>
          <span className="node-container child-node-margin-left">
            {Children.map(children, (child) =>
              cloneElement(child, {
                ...child.props,
                isAddNewNode: true,
                dataItem: null,
              })
            )}
          </span>
        </>
      )}
      {isEditable && showSection && isAddNewNode && (
        <span className="node-container">{children}</span>
      )}
      {!isEditable && !showSection && !isAddNewNode && (
        <span className="node-container editable">{children}</span>
      )}
      {!isEditable && showSection && isAddNewNode && (
        <span className="node-container">{children}</span>
      )}
    </>
  );
};
export default ItemTemplatePlaceholder;
