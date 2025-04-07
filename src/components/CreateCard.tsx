
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface CreateCardProps {
  onAddCard: (title: string) => void;
}

const CreateCard: React.FC<CreateCardProps> = ({ onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddCard(title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start text-gray-500 hover:bg-gray-100 hover:text-gray-700 mt-2"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="h-4 w-4 mr-2" />
        <span>Add a card</span>
      </Button>
    );
  }

  return (
    <div className="mt-2 animate-fade-in">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border border-trello-border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-trello-blue focus:border-transparent"
          placeholder="Enter a title for this card..."
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={3}
        />
        <div className="flex items-center mt-2 space-x-2">
          <Button type="submit" className="bg-trello-blue hover:bg-trello-dark-blue">
            Add card
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="p-2 hover:bg-gray-100 rounded-full h-8 w-8"
            onClick={() => setIsAdding(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;
