import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import styled from 'styled-components';

interface SortableItemProps {
  children: React.ReactNode;
  id: number | string;
}
const SortableItem = ({ children, id }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    opacity: isDragging ? 0.4 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ItemWrapper ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

export default SortableItem;
