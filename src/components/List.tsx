
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import Card from './Card';
import CreateCard from './CreateCard';
import { cn } from '@/lib/utils';

export interface CardType {
  id: string;
  title: string;
  description?: string;
  labels?: { color: string; text?: string }[];
}

interface ListProps {
  title: string;
  cards: CardType[];
  onAddCard: (listId: string, title: string) => void;
  id: string;
  className?: string;
}

const List: React.FC<ListProps> = ({
  id,
  title,
  cards,
  onAddCard,
  className,
}) => {
  const handleAddCard = (cardTitle: string) => {
    onAddCard(id, cardTitle);
  };

  return (
    <div 
      className={cn(
        "bg-trello-gray rounded-md w-72 h-fit max-h-full flex-shrink-0 flex flex-col shadow-sm",
        className
      )}
    >
      <div className="p-2 flex justify-between items-center">
        <h2 className="font-medium px-2 py-1 text-trello-dark-gray">{title}</h2>
        <button className="p-1 rounded-md hover:bg-gray-200">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="px-2 pb-2 flex-1 overflow-y-auto scrollbar-hide">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            title={card.title} 
            description={card.description}
            labels={card.labels}
          />
        ))}
        
        <CreateCard onAddCard={handleAddCard} />
      </div>
    </div>
  );
};

export default List;
