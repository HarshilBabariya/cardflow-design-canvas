
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Card from './Card';
import CreateCard from './CreateCard';
import { cn } from '@/lib/utils';
import { Card as CardType } from '@/types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id,
    data: {
      type: 'list',
      index
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const handleAddCard = (cardTitle: string) => {
    onAddCard(id, cardTitle);
  };

  // Sort cards by position
  const sortedCards = [...cards].sort((a, b) => a.position - b.position);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-trello-gray rounded-md w-72 h-fit max-h-full flex-shrink-0 flex flex-col shadow-sm",
        isDragging && "shadow-lg",
        className
      )}
    >
      <div 
        className="p-2 flex justify-between items-center cursor-grab"
        {...attributes}
        {...listeners}
      >
        <h2 className="font-medium px-2 py-1 text-trello-dark-gray">{title}</h2>
        <button className="p-1 rounded-md hover:bg-gray-200">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <SortableContext 
        items={sortedCards.map(card => card.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className={cn(
            "px-2 pb-2 flex-1 overflow-y-auto scrollbar-hide"
          )}
        >
          {sortedCards.map((card, cardIndex) => (
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
              listId={id}
              index={cardIndex}
            />
          ))}
          
          <CreateCard onAddCard={handleAddCard} />
        </div>
      </SortableContext>
    </div>
  );
};

export default List;
