
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Search, Bell, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-trello-border h-16 px-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-6">
        <h1 className="text-2xl font-bold text-trello-blue">Kanbanify</h1>
        <Button variant="ghost" className="text-trello-dark-gray flex items-center gap-2">
          <span>Boards</span>
        </Button>
        <Button variant="ghost" className="text-trello-dark-gray flex items-center gap-2">
          <span>Recent</span>
        </Button>
        <Button variant="ghost" className="text-trello-dark-gray flex items-center gap-2">
          <span>Templates</span>
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-8 pr-4 py-1.5 border border-trello-border rounded-md focus:outline-none focus:ring-2 focus:ring-trello-blue focus:border-transparent" 
          />
        </div>
        
        <Button variant="ghost" className="rounded-full w-8 h-8 p-0 flex items-center justify-center">
          <Bell className="h-5 w-5 text-trello-dark-gray" />
        </Button>
        
        <Button variant="ghost" className="rounded-full w-8 h-8 p-0 flex items-center justify-center">
          <User className="h-5 w-5 text-trello-dark-gray" />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
