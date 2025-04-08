
import React from 'react';
import Navbar from '@/components/Navbar';
import Board from '@/components/Board';
import { WorkspaceProvider } from '@/context/WorkspaceContext';
import WorkspaceSelector from '@/components/WorkspaceSelector';
import BoardSelector from '@/components/BoardSelector';

const Index = () => {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-trello-gray flex flex-col">
        <Navbar />
        
        <div className="container mx-auto px-4 py-6">
          <WorkspaceSelector />
          <BoardSelector />
        </div>
        
        <div className="p-3 bg-trello-blue mt-6">
          <div className="container mx-auto px-4">
            {/* Current board name would go here */}
          </div>
        </div>
        
        <div className="flex-grow">
          <Board />
        </div>
      </div>
    </WorkspaceProvider>
  );
};

export default Index;
