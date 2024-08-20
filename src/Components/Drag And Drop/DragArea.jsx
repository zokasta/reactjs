import { DndContext, closestCorners } from "@dnd-kit/core";
import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Container from "./DragContainer";

export default function DragArea({ data }) {
  const [containers, setContainers] = useState(data);
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeContainerId = active.data.current?.sortable?.containerId;
    const overContainerId = over.data.current?.sortable?.containerId;

    if (!activeContainerId || !overContainerId) return;

    if (activeContainerId !== overContainerId) {
      setContainers((prev) => {
        const activeItems = prev[activeContainerId];
        const overItems = prev[overContainerId];

        const activeIndex = activeItems.indexOf(active.id);

        // Remove from active container
        const updatedActiveItems = [...activeItems];
        updatedActiveItems.splice(activeIndex, 1);

        // Add to over container
        const updatedOverItems = [...overItems];
        updatedOverItems.push(active.id);

        return {
          ...prev,
          [activeContainerId]: updatedActiveItems,
          [overContainerId]: updatedOverItems,
        };
      });
    } else {
      setContainers((prev) => {
        const activeIndex = prev[activeContainerId].indexOf(active.id);
        const overIndex = prev[overContainerId].indexOf(over.id);
        return {
          ...prev,
          [activeContainerId]: arrayMove(
            prev[activeContainerId],
            activeIndex,
            overIndex
          ),
        };
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="flex">
        {Object.keys(containers).map((containerId) => (
          <Container
            key={containerId}
            id={containerId}
            items={containers[containerId]}
          />
        ))}
      </div>
    </DndContext>
  );
}
