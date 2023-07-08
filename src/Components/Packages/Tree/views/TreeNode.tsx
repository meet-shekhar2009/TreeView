import ItemTemplatePlaceholder from './ItemTemplatePlaceholder';
import Icons from './Icons';
import { NodeProps, TemplateProps } from '../types';
import { useState } from 'react';
import Tree from './Tree';
import { validateFieldAndRenderValues } from '../validations';
import UserTemplate from '../Templates/UserTemplate';
import { hasValue, mapObjects } from '../utility';
import { EnumAction } from '../constant';
import { v4 as uuidv4 } from 'uuid';

const TreeNode = (props: NodeProps) => {
  validateFieldAndRenderValues(props);

  const [showSection, setShowSection] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);

  const handleSaveItem = (node: any) => {
    setShowSection(false);
    const newNode = {
      ...node,
      ChildrenIds: [],
      id: uuidv4(),
    };
    saveAndRerender(newNode);
    syncSavedDataModel(newNode);
  };

  function saveAndRerender(newNode: any) {
    switch (
      hasValue(props.isEditable) &&
      !showSection &&
      hasValue(props.currentNode)
    ) {
      case true:
        mapObjects(newNode, props.currentNode, ['id', 'Children']);
        props.setData([...props.data]);
        break;
      default:
        switch (hasValue(props.currentNode)) {
          case true:
            if (!props.currentNode) break;
            props.currentNode.Children = [newNode];
            props.setData([...props.data]);
            break;

          default:
            props.setData([...props.data, newNode]);
            if (!props.setParent) return;
            props.setParent((k) => {
              return k.map((m) => {
                if (m.id === props.parentNode?.id)
                  m.ChildrenIds.push(newNode.id);
                return m;
              });
            });

            break;
        }
        break;
    }
  }

  function syncSavedDataModel(newNode: any) {
    const action = props.isAddNewNode ? EnumAction.ADD : EnumAction.UPDATE;
    if (
      (props.parentNode === null || props.nodeLevel > 1) &&
      props.currentNode &&
      props.onSave
    )
      props.onSave(props.currentNode, newNode, action);
    else if (props.onSave) props.onSave(props.parentNode, newNode, action);
  }

  function ShowNodeContent() {
    const templetProps: TemplateProps = {
      dataItem: props.currentNode,
      isEditable: props.isEditable,
      handleSaveNode: handleSaveItem,
      isAddNewNode: props.isAddNewNode,
    };
    return (
      <ItemTemplatePlaceholder
        {...props}
        setShowSection={setShowSection}
        showSection={showSection}
        isAddNewNode={props.isAddNewNode}
      >
        {props.render ? (
          props.render(templetProps)
        ) : (
          <UserTemplate {...templetProps} />
        )}
      </ItemTemplatePlaceholder>
    );
  }

  return (
    <>
      <Icons
        showSection={showSection}
        setShowSection={setShowSection}
        isCollapsed={isCollapsed}
        setCollapsed={setCollapsed}
        currentNode={props.currentNode}
        setParent={props.setParent}
        setData={props.setData}
        data={props.data}
        onSave={props.onSave}
        showAddButton={props.showAddButton}
        showDeleteButton={props.showDeleteButton}
        addIcon={props.addIcon}
        removeIcon={props.removeIcon}
        expandIcon={props.expandIcon}
        collapseIcon={props.collapseIcon}
      ></Icons>
      <ShowNodeContent />
      {!isCollapsed && props.currentNode?.Children && (
        <Tree
          parentNode={props.currentNode}
          root={props.currentNode?.Children}
          nodeLevel={props.nodeLevel + 1}
          isEditable={props.isEditable}
          setParent={props.setData}
          onSave={props.onSave}
          render={props.render}
          isAddNewNode={props.isAddNewNode}
          showAddButton={props.showAddButton}
          showDeleteButton={props.showDeleteButton}
          addIcon={props.addIcon}
          removeIcon={props.removeIcon}
          expandIcon={props.expandIcon}
          collapseIcon={props.collapseIcon}
        />
      )}
    </>
  );
};

export default TreeNode;
