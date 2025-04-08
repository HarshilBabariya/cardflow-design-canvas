
import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Visibility } from '@/types';

const BoardSelector: React.FC = () => {
  const { currentWorkspace, currentBoard, setCurrentBoard, addBoard } = useWorkspace();
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('private');

  const handleAddBoard = () => {
    if (newBoardName.trim() && currentWorkspace) {
      addBoard(
        newBoardName.trim(),
        newBoardDescription.trim(),
        currentWorkspace.id,
        visibility
      );
      setNewBoardName('');
      setNewBoardDescription('');
      setVisibility('private');
    }
  };

  if (!currentWorkspace) {
    return <div className="text-white mt-6">Please select a workspace first</div>;
  }

  return (
    <div className="flex flex-col w-full mt-8">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Boards in {currentWorkspace.title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {currentWorkspace.boards.map((board) => (
          <Card 
            key={board.id} 
            className={`cursor-pointer hover:bg-gray-50 ${board.id === currentBoard?.id ? 'ring-2 ring-trello-blue' : ''}`}
            onClick={() => setCurrentBoard(board.id)}
          >
            <CardContent className="p-4">
              <div className="h-24 mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md"></div>
              <h3 className="font-medium">{board.name}</h3>
              {board.visibility === 'private' ? (
                <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded mt-1">Private</span>
              ) : (
                <span className="inline-block text-xs bg-green-100 px-2 py-1 rounded mt-1">Public</span>
              )}
            </CardContent>
          </Card>
        ))}
        
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-gray-50 border-dashed">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[150px]">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Create new board</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Board</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Board Name</Label>
                <Input
                  id="name"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="My Board"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newBoardDescription}
                  onChange={(e) => setNewBoardDescription(e.target.value)}
                  placeholder="Describe this board"
                />
              </div>
              <div className="grid gap-2">
                <Label>Visibility</Label>
                <RadioGroup 
                  value={visibility} 
                  onValueChange={(value) => setVisibility(value as Visibility)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="public" />
                    <Label htmlFor="public">Public</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleAddBoard}>Create Board</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default BoardSelector;
