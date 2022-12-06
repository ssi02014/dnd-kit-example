import React, { useMemo, useState } from 'react';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import styled from 'styled-components';

const DndList = ({ renderItem, items, onChange }: any) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const activeItem = useMemo(
    () => items.find((item: any) => item.id === activeId),
    [activeId, items]
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item: any) => item.id === active.id);
      const newIndex = items.findIndex((item: any) => item.id === over.id);

      onChange(arrayMove(items, oldIndex, newIndex));
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <GridWrapper>
          {items.map((item: any, index: number) => (
            <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
          ))}
        </GridWrapper>
      </SortableContext>

      <DragOverlay adjustScale={true}>
        {activeItem ? renderItem(activeItem) : null}
      </DragOverlay>
    </DndContext>
  );
};

const GridWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

export default DndList;
