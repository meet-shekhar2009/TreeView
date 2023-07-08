interface Fields {
  name: string;
  id: string;
}

export interface Node extends Fields {
  Children?: Node[] | null;
}

export interface TreeProps {
  onSave?: (parentNode: Node | null | undefined, value: Node) => void;
  root: Node[];
  parentNode?: Node;
  nodeLevel: number;
}
export interface NodeProps {
  currentNode?: Node;
  parentNode?: Node | null;
  data: Node[];
  nodeLevel: number;
  setData: (nodes: Node[]) => void;
  onSave: TreeProps['onSave'];
}
export interface NodeTextBoxProps extends NodeProps {
  setShowTextbox: (value: boolean) => void;
  showTextbox?: boolean;
}

export type IconsProps = Pick<
  NodeTextBoxProps,
  'showTextbox' | 'setShowTextbox' | 'currentNode'
> & {
  isCollapsed: boolean;
  setCollapsed: (value: (pre: boolean) => boolean) => void;
};

export type CreateIconProps = Omit<IconsProps, 'isCollapsed' | 'setCollapsed'>;
export type CollapseIconProps = Pick<
  IconsProps,
  'isCollapsed' | 'setCollapsed'
>;
