
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  description?: string;
  labels?: { color: string; text?: string }[];
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  labels = [],
  className,
}) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-md shadow-sm border border-trello-border p-3 mb-2 cursor-pointer hover:shadow-md transition-all animate-fade-in",
        className
      )}
    >
      {labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {labels.map((label, i) => (
            <div 
              key={i} 
              className={`h-2 w-10 rounded-sm ${label.color}`} 
              title={label.text}
            />
          ))}
        </div>
      )}
      
      <h3 className="text-sm font-medium text-trello-dark-gray mb-1">{title}</h3>
      
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default Card;
