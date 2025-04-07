
import React, { useState } from 'react';
import List, { CardType } from './List';
import CreateList from './CreateList';
import { v4 as uuidv4 } from 'uuid';

interface ListType {
  id: string;
  title: string;
  cards: CardType[];
}

const Board: React.FC = () => {
  const [lists, setLists] = useState<ListType[]>([
    {
      id: uuidv4(),
      title: 'To Do',
      cards: [
        {
          id: uuidv4(),
          title: 'Learn React basics',
          labels: [{ color: 'bg-blue-500', text: 'Learning' }],
        },
        {
          id: uuidv4(),
          title: 'Design a new logo',
          description: 'Create a modern and sleek logo for the brand',
          labels: [{ color: 'bg-yellow-500', text: 'Design' }],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'In Progress',
      cards: [
        {
          id: uuidv4(),
          title: 'Build UI components',
          description: 'Create reusable UI components for the application',
          labels: [
            { color: 'bg-green-500', text: 'Development' },
            { color: 'bg-purple-500', text: 'Frontend' },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      title: 'Done',
      cards: [
        {
          id: uuidv4(),
          title: 'Set up project repository',
          labels: [{ color: 'bg-red-500', text: 'DevOps' }],
        },
        {
          id: uuidv4(),
          title: 'Research competitors',
          description: 'Analyze what similar products are doing in the market',
          labels: [{ color: 'bg-orange-500', text: 'Research' }],
        },
        {
          id: uuidv4(),
          title: 'Gather requirements',
          labels: [{ color: 'bg-indigo-500', text: 'Planning' }],
        },
      ],
    },
  ]);

  const handleAddList = (title: string) => {
    const newList: ListType = {
      id: uuidv4(),
      title,
      cards: [],
    };
    setLists([...lists, newList]);
  };

  const handleAddCard = (listId: string, cardTitle: string) => {
    const newCard: CardType = {
      id: uuidv4(),
      title: cardTitle,
    };

    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [...list.cards, newCard],
        };
      }
      return list;
    }));
  };

  return (
    <div className="board-container p-6 flex items-start space-x-4 scrollbar-hide">
      {lists.map(list => (
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          cards={list.cards}
          onAddCard={handleAddCard}
        />
      ))}
      
      <CreateList onAddList={handleAddList} />
    </div>
  );
};

export default Board;
