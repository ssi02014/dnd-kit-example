import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import styled from 'styled-components';

const DnDItem = (props: any) => {
  const sortable = useSortable({ id: props.id });
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.4 : 1,
    transition,
    transformOrigin: '0 0',
  };

  return (
    <ItemWrapper
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}>
      {props.value}
    </ItemWrapper>
  );
};

const ItemWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DnDItem;
