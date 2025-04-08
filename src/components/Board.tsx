
import React from 'react';
import List from './List';
import CreateList from './CreateList';
import { useWorkspace } from '@/context/WorkspaceContext';
import { 
  DndContext, 
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent
} from '@dnd-kit/core';
import { 
  SortableContext, 
  horizontalListSortingStrategy,
  arrayMove
} from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const Board: React.FC = () => {
  const { currentBoard, addList, addCard, updateCardPosition, updateListPosition } = useWorkspace();
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddList = (title: string) => {
    if (currentBoard) {
      addList(currentBoard.id, title);
    }
  };

  const handleAddCard = (listId: string, cardTitle: string) => {
    addCard(listId, cardTitle);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id as string;
    const overId = over.id as string;
    
    if (activeId === overId) return;
    
    // Check if we're dragging a list
    if (active.data.current?.type === 'list') {
      const oldIndex = currentBoard?.lists.findIndex(list => list.id === activeId) ?? -1;
      const newIndex = currentBoard?.lists.findIndex(list => list.id === overId) ?? -1;
      
      if (oldIndex !== -1 && newIndex !== -1) {
        updateListPosition(activeId, newIndex);
      }
    } else {
      // We're dragging a card
      const sourceListId = active.data.current?.listId as string;
      const destinationListId = over.data.current?.listId as string || sourceListId;
      
      // Find the position in the destination list
      const destinationList = currentBoard?.lists.find(list => list.id === destinationListId);
      const newIndex = destinationList?.cards.findIndex(card => card.id === overId) ?? 0;
      
      updateCardPosition(activeId, sourceListId, destinationListId, newIndex);
    }
    
    setActiveId(null);
  };

  if (!currentBoard) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Select or create a board to get started
      </div>
    );
  }

  // Get the sorted lists for rendering
  const sortedLists = [...currentBoard.lists].sort((a, b) => a.position - b.position);
  
  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext 
        items={sortedLists.map(list => list.id)} 
        strategy={horizontalListSortingStrategy}
      >
        <div className="board-container p-6 flex items-start space-x-4 overflow-x-auto scrollbar-hide">
          {sortedLists.map((list, index) => (
            <List
              key={list.id}
              id={list.id}
              title={list.title}
              cards={list.cards}
              onAddCard={handleAddCard}
              index={index}
            />
          ))}
          
          <CreateList onAddList={handleAddList} />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Board;
