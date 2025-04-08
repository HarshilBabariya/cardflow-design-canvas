
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
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No Board Selected</h2>
          <p className="text-gray-500">Select or create a board to get started</p>
        </div>
      </div>
    );
  }

  // Get the sorted lists for rendering
  const sortedLists = [...currentBoard.lists].sort((a, b) => a.position - b.position);
  
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold">{currentBoard.name}</h1>
        {currentBoard.description && (
          <p className="text-sm text-gray-600">{currentBoard.description}</p>
        )}
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" type="list" direction="horizontal">
          {(provided) => (
            <div 
              className="board-container flex items-start space-x-4 overflow-x-auto pb-4 pt-2"
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
    </div>
  );
};

export default Board;
