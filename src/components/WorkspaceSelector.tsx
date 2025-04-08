
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

const WorkspaceSelector: React.FC = () => {
  const { workspaces, currentWorkspace, setCurrentWorkspace, addWorkspace } = useWorkspace();
  const [newWorkspaceTitle, setNewWorkspaceTitle] = useState('');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('');

  const handleAddWorkspace = () => {
    if (newWorkspaceTitle.trim()) {
      addWorkspace(newWorkspaceTitle.trim(), newWorkspaceDescription.trim());
      setNewWorkspaceTitle('');
      setNewWorkspaceDescription('');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-1">
            {currentWorkspace?.title || 'Select Workspace'}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {workspaces.map((workspace) => (
            <DropdownMenuItem 
              key={workspace.id}
              onClick={() => setCurrentWorkspace(workspace.id)}
              className={workspace.id === currentWorkspace?.id ? 'bg-accent' : ''}
            >
              {workspace.title}
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
            <DialogTitle>Create New Workspace</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Workspace Title</Label>
              <Input 
                id="title" 
                value={newWorkspaceTitle}
                onChange={(e) => setNewWorkspaceTitle(e.target.value)}
                placeholder="My Workspace"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={newWorkspaceDescription}
                onChange={(e) => setNewWorkspaceDescription(e.target.value)}
                placeholder="Describe this workspace"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleAddWorkspace}>Create Workspace</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WorkspaceSelector;
