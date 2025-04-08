
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Card from './Card';
import CreateCard from './CreateCard';
import { cn } from '@/lib/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Card as CardType } from '@/types';

interface ListProps {
  id: string;
  title: string;
  cards: CardType[];
  onAddCard: (listId: string, title: string) => void;
  index: number;
  className?: string;
}

const List: React.FC<ListProps> = ({
  id,
  title,
  cards,
  onAddCard,
  index,
  className,
}) => {
  const handleAddCard = (cardTitle: string) => {
    onAddCard(id, cardTitle);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={cn(
            "bg-trello-gray rounded-md w-72 h-fit max-h-full flex-shrink-0 flex flex-col shadow-sm",
            className
          )}
        >
          <div 
            className="p-2 flex justify-between items-center"
            {...provided.dragHandleProps}
          >
            <h2 className="font-medium px-2 py-1 text-trello-dark-gray">{title}</h2>
            <button className="p-1 rounded-md hover:bg-gray-200">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <Droppable droppableId={id} type="card">
            {(dropProvided, dropSnapshot) => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                className={cn(
                  "px-2 pb-2 flex-1 overflow-y-auto scrollbar-hide",
                  dropSnapshot.isDraggingOver && "bg-blue-50"
                )}
              >
                {cards
                  .sort((a, b) => a.position - b.position)
                  .map((card, cardIndex) => (
                    <Card
                      key={card.id}
                      id={card.id}
                      title={card.name}
                      description={card.description}
                      labels={card.labels}
                      attachments={card.attachments?.length}
                      members={card.members}
                      startDate={card.start_date}
                      priority={card.priority}
                      index={cardIndex}
                    />
                  ))}
                {dropProvided.placeholder}
                
                <CreateCard onAddCard={handleAddCard} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
