import {  useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function DraggableItem({ id }){
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };
  
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="p-2 border border-gray-500 m-1 bg-orange-400 cursor-grab rounded-sm shadow-md "
        {...attributes}
        {...listeners}
      >
        Item {id}
      </div>
    );
  };