
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface CreateListProps {
  onAddList: (title: string) => void;
}

const CreateList: React.FC<CreateListProps> = ({ onAddList }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddList(title.trim());
      setTitle('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <Button
        variant="secondary"
        className="bg-white/80 backdrop-blur-sm border border-trello-border h-12 w-72 flex-shrink-0 hover:bg-white shadow-sm"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="h-5 w-5 mr-2" />
        <span>Add another list</span>
      </Button>
    );
  }

  return (
    <div className="bg-trello-gray p-2 rounded-md w-72 flex-shrink-0 shadow-sm animate-fade-in">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-full border border-trello-border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-trello-blue focus:border-transparent"
          placeholder="Enter list title..."
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex items-center mt-2 space-x-2">
          <Button type="submit" className="bg-trello-blue hover:bg-trello-dark-blue">
            Add list
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

export default CreateList;
