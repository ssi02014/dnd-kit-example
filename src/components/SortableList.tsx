import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import type { DropAnimation } from '@dnd-kit/core';

interface Items {
  id: number | string;
  value: string;
}

interface SortableListProps {
  items: Items[];
  renderItem: (items: Items) => React.ReactNode;
  onChange: (items: Items[]) => void;
}

const SortableList = ({ items, renderItem, onChange }: SortableListProps) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    setActiveId(null);

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      onChange(arrayMove(items, oldIndex, newIndex));
    }
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  };

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}>
      <SortableContext items={items}>
        <ListWrapper>
          {items.map((el, idx) => (
            <React.Fragment key={idx}>{renderItem(el)}</React.Fragment>
          ))}
        </ListWrapper>
        <DragOverlay adjustScale={true} dropAnimation={dropAnimationConfig}>
          {activeId ? renderItem(activeId) : null}
        </DragOverlay>
      </SortableContext>
    </DndContext>
  );
};

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export default SortableList;
