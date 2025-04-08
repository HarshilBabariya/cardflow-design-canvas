
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
import { Card, CardContent } from '@/components/ui/card';

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
    <div className="flex flex-col w-full">
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold text-white">Workspaces</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {workspaces.map((workspace) => (
          <Card 
            key={workspace.id} 
            className={`cursor-pointer hover:bg-gray-50 ${workspace.id === currentWorkspace?.id ? 'ring-2 ring-trello-blue' : ''}`}
            onClick={() => setCurrentWorkspace(workspace.id)}
          >
            <CardContent className="p-4">
              <div className="h-10 mb-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-md"></div>
              <h3 className="font-medium">{workspace.title}</h3>
              {workspace.description && (
                <p className="text-sm text-gray-500 truncate">{workspace.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
        
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:bg-gray-50 border-dashed">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full min-h-[120px]">
                <Plus className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Create new workspace</p>
              </CardContent>
            </Card>
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
    </div>
  );
};

export default WorkspaceSelector;
