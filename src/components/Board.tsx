
import React, { useState } from 'react';
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
    const { destination, source, draggableId, type } = result;

    // If there's no destination, or the item is dropped back to its original position, we do nothing
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    // Handle list reordering
    if (type === 'list') {
      updateListPosition(draggableId, destination.index);
      return;
    }

    // Handle card movement
    const sourceListId = source.droppableId;
    const destinationListId = destination.droppableId;
    const newIndex = destination.index;
    
    updateCardPosition(draggableId, sourceListId, destinationListId, newIndex);
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
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="board" type="list" direction="horizontal">
        {(provided) => (
          <div 
            className="board-container p-6 flex items-start space-x-4 overflow-x-auto scrollbar-hide"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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
            {provided.placeholder}
            
            <CreateList onAddList={handleAddList} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
