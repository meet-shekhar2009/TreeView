import { EnumAction } from './constant';

export interface Fields {
  name: string;
}

export type Node<T extends {}> = T & {
  id: string;
  field: string;
  Children?: Node<T>[] | null;
};

export interface TreeProps<T extends {}> {
  onSave?: (
    parentNode: Node<T> | null | undefined,
    value: Node<T> | null,
    action: EnumAction
  ) => void;
  render?: <T>(props: T) => JSX.Element;
  setParent?: React.Dispatch<React.SetStateAction<Node<T>[]>>;
  root: Node<T>[];
  parentNode?: Node<T>;
  nodeLevel: number;
  isEditable?: boolean;
}

export interface NodeProps<T extends {}> {
  currentNode?: Node<T>;
  parentNode?: TreeProps<T>['parentNode'] | null;
  data: Node<T>[];
  nodeLevel: TreeProps<T>['nodeLevel'];
  setParent?: TreeProps<T>['setParent'];
  setData: React.Dispatch<React.SetStateAction<Node<T>[]>>;
  onSave: TreeProps<T>['onSave'];
  render?: TreeProps<T>['render'];
  isEditable?: TreeProps<T>['isEditable'];
}

export interface NodeTextBoxProps<T extends {}> extends NodeProps<T> {
  setShowTextbox: (value: boolean) => void;
  showTextbox?: boolean;
}

export type IconsProps<T extends {}> = Omit<
  NodeTextBoxProps<T>,
  'isEditable' | 'render' | 'nodeLevel'
> & {
  onSave?: TreeProps<T>['onSave'];
  isCollapsed: boolean;
  setCollapsed: (value: (pre: boolean) => boolean) => void;
};

export type CreateIconProps<T extends {}> = Omit<
  IconsProps<T>,
  'isCollapsed' | 'setCollapsed'
>;
export type CollapseIconProps<T extends {}> = Pick<
  IconsProps<T>,
  'isCollapsed' | 'setCollapsed'
>;

export function getProperty<T, K extends keyof T>(
  obj: T,
  propName: K
): T[K] | null {
  return obj[propName] || null;
}
