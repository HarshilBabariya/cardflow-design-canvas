
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
        <div className="p-3 bg-trello-blue flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center space-x-4">
            <WorkspaceSelector />
            <BoardSelector />
          </div>
        </div>
        <Board />
      </div>
    </WorkspaceProvider>
  );
};

export default Index;
