
import React, { useState } from 'react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { ChevronDown, Plus } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
    return <div className="text-sm text-muted-foreground">Select a workspace first</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            {currentBoard?.name || 'Select Board'}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {currentWorkspace.boards.map((board) => (
            <DropdownMenuItem
              key={board.id}
              onClick={() => setCurrentBoard(board.id)}
              className={board.id === currentBoard?.id ? 'bg-accent' : ''}
            >
              {board.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
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
  );
};

export default BoardSelector;
