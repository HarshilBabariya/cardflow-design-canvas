
import React from 'react';
import List from './List';
import CreateList from './CreateList';
import { useWorkspace } from '@/context/WorkspaceContext';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

const Board: React.FC = () => {
  const { currentBoard, addList, addCard, updateCardPosition, updateListPosition } = useWorkspace();

  const handleAddList = (title: string) => {
    if (currentBoard) {
      addList(currentBoard.id, title);
    }
  };

  const handleAddCard = (listId: string, cardTitle: string) => {
    addCard(listId, cardTitle);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type, draggableId } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // No movement
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    
    // Moving a list
    if (type === 'list') {
      updateListPosition(draggableId, destination.index);
      return;
    }
    
    // Moving a card
    updateCardPosition(
      draggableId,
      source.droppableId,
      destination.droppableId,
      destination.index
    );
  };

  if (!currentBoard) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Select or create a board to get started
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div 
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="board-container p-6 flex items-start space-x-4 overflow-x-auto scrollbar-hide"
          >
            {currentBoard.lists
              .sort((a, b) => a.position - b.position)
              .map((list, index) => (
                <List
                  key={list.id}
                  id={list.id}
                  title={list.title}
                  cards={list.cards}
                  onAddCard={handleAddCard}
                  index={index}
                />
              ))}
            {provided.placeholder}
            
            <CreateList onAddList={handleAddList} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
