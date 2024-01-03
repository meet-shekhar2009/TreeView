import { ReactNode } from 'react';
import { EnumAction } from './constant';

export interface DefaultFields {
  field: string;
}

export type Node = {
  id: string;
  field: string;
  Children?: Node[] | null;
  ChildrenIds: string[];
};

export interface TreeProps extends ExposedOptionalProps {
  onSave?: (
    parentNode: Node | null | undefined,
    value: Node | null,
    action: EnumAction
  ) => void;
  render?: (props: TemplateProps) => JSX.Element;
  setParent?: React.Dispatch<React.SetStateAction<Node[]>>;
  root: Node[];
  parentNode?: Node | null;
  nodeLevel: number;
  isEditable?: boolean;
  isAddNewNode?: boolean;
  children?: any;
}

export type NodeProps = Omit<TreeProps, 'root'> & {
  currentNode?: Node;
  data: Node[];
  setData: React.Dispatch<React.SetStateAction<Node[]>>;
};

export interface TemplateProps {
  dataItem: any;
  isEditable?: TreeProps['isEditable'];
  isAddNewNode?: TreeProps['isAddNewNode'];
  handleSaveNode?: <T>(node: T) => void;
}

export interface NodeTemplatePlaceholderProps {
  isEditable?: TreeProps['isEditable'];
  children?: TreeProps['children'];
  isAddNewNode?: TreeProps['isAddNewNode'];
  setShowSection?: (value: boolean) => void;
  showSection?: boolean;
}

export interface IconsProps
  extends NodeTemplatePlaceholderProps,
    ExposedOptionalProps {
  onSave?: TreeProps['onSave'];
  isCollapsed: boolean;
  setCollapsed: (value: (pre: boolean) => boolean) => void;
  data: Node[];
  currentNode?: Node;
  setParent?: TreeProps['setParent'];
  setData: React.Dispatch<React.SetStateAction<Node[]>>;
}

export type CreateIconProps = Omit<IconsProps, 'isCollapsed' | 'setCollapsed'> &
  ExposedOptionalProps;
export type CollapseIconProps = Pick<
  IconsProps,
  'isCollapsed' | 'setCollapsed'
> &
  ExposedOptionalProps;

export function getProperty<T, K extends keyof T>(
  obj: T,
  propName: K
): T[K] | null {
  return obj[propName] || null;
}

export interface ExposedOptionalProps {
  isEditable?: boolean;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  onDataChanges?: (data: Node[]) => void;
  onAddRow?: (data: Node | null) => Promise<boolean> | boolean;
  onUpdateRow?: (data: Node | null) => Promise<boolean> | boolean;
  onDeleteRow?: (data: Node | null) => Promise<boolean> | boolean;
  render?: TreeProps['render'];
  addIcon?: JSX.Element;
  removeIcon?: JSX.Element;
  expandIcon?: JSX.Element;
  collapseIcon?: JSX.Element;
}
export interface ExposedRequiredProps {
  data: Node[];
}
export type ExposedProps = ExposedRequiredProps & ExposedOptionalProps;
