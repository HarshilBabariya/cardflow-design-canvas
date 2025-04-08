
import React from 'react';
import { Calendar, Paperclip, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Draggable } from 'react-beautiful-dnd';
import { Priority } from '@/types';

interface CardProps {
  id: string;
  title: string;
  description?: string;
  labels?: { color: string; text?: string }[];
  attachments?: number;
  members?: string[];
  startDate?: Date;
  priority?: Priority;
  index: number;
  className?: string;
}

const getPriorityColor = (priority?: Priority) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Card: React.FC<CardProps> = ({
  id,
  title,
  description,
  labels = [],
  attachments,
  members,
  startDate,
  priority,
  index,
  className,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "bg-white rounded-md shadow-sm border border-trello-border p-3 mb-2 cursor-pointer hover:shadow-md transition-all animate-fade-in",
            snapshot.isDragging && "shadow-lg",
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
            <p className="text-xs text-gray-500 mb-2">{description}</p>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <div className="flex items-center space-x-2">
              {priority && (
                <span className={`px-1.5 py-0.5 rounded-full text-xs ${getPriorityColor(priority)}`}>
                  {priority}
                </span>
              )}
              
              {startDate && (
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{new Date(startDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {attachments && attachments > 0 && (
                <div className="flex items-center">
                  <Paperclip className="h-3 w-3 mr-1" />
                  <span>{attachments}</span>
                </div>
              )}
              
              {members && members.length > 0 && (
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{members.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
