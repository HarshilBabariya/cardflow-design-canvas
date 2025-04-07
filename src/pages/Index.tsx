
import React from 'react';
import Navbar from '@/components/Navbar';
import Board from '@/components/Board';

const Index = () => {
  return (
    <div className="min-h-screen bg-trello-gray flex flex-col">
      <Navbar />
      <div className="p-2 bg-trello-blue flex items-center">
        <h2 className="text-white font-semibold px-4">Main Project Board</h2>
      </div>
      <Board />
    </div>
  );
};

export default Index;
