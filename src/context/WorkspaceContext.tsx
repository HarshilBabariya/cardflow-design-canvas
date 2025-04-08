
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Workspace, Board, List, Card, Priority, Status } from '@/types';

interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  currentBoard: Board | null;
  setCurrentWorkspace: (workspaceId: string) => void;
  setCurrentBoard: (boardId: string) => void;
  addWorkspace: (title: string, description: string) => void;
  addBoard: (name: string, description: string, workspaceId: string, visibility: 'public' | 'private') => void;
  addList: (boardId: string, title: string) => void;
  addCard: (listId: string, name: string) => void;
  updateCardPosition: (cardId: string, sourceListId: string, destinationListId: string, newPosition: number) => void;
  updateListPosition: (listId: string, newPosition: number) => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
};

interface WorkspaceProviderProps {
  children: ReactNode;
}

export const WorkspaceProvider: React.FC<WorkspaceProviderProps> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspaceState] = useState<Workspace | null>(null);
  const [currentBoard, setCurrentBoardState] = useState<Board | null>(null);

  // Initialize with default workspace and board
  useEffect(() => {
    const defaultWorkspaceId = uuidv4();
    const defaultBoardId = uuidv4();
    
    const todoListId = uuidv4();
    const inProgressListId = uuidv4();
    const doneListId = uuidv4();
    
    const initialWorkspaces: Workspace[] = [
      {
        id: defaultWorkspaceId,
        title: 'Main Workspace',
        description: 'Default workspace for your projects',
        created_by: 'current-user',
        boards: [
          {
            id: defaultBoardId,
            name: 'Main Project Board',
            description: 'Your first project board',
            owner: 'current-user',
            members: ['current-user'],
            workspace_id: defaultWorkspaceId,
            visibility: 'private',
            lists: [
              {
                id: todoListId,
                title: 'To Do',
                board_id: defaultBoardId,
                position: 0,
                cards: [
                  {
                    id: uuidv4(),
                    name: 'Learn React basics',
                    list_id: todoListId,
                    labels: [{ color: 'bg-blue-500', text: 'Learning' }],
                    position: 0,
                    status: 'todo',
                    created_by: 'current-user',
                    priority: 'medium',
                  },
                  {
                    id: uuidv4(),
                    name: 'Design a new logo',
                    description: 'Create a modern and sleek logo for the brand',
                    list_id: todoListId,
                    labels: [{ color: 'bg-yellow-500', text: 'Design' }],
                    position: 1,
                    status: 'todo',
                    created_by: 'current-user',
                    priority: 'low',
                  },
                ],
              },
              {
                id: inProgressListId,
                title: 'In Progress',
                board_id: defaultBoardId,
                position: 1,
                cards: [
                  {
                    id: uuidv4(),
                    name: 'Build UI components',
                    description: 'Create reusable UI components for the application',
                    list_id: inProgressListId,
                    labels: [
                      { color: 'bg-green-500', text: 'Development' },
                      { color: 'bg-purple-500', text: 'Frontend' },
                    ],
                    position: 0,
                    status: 'in-progress',
                    created_by: 'current-user',
                    priority: 'high',
                  },
                ],
              },
              {
                id: doneListId,
                title: 'Done',
                board_id: defaultBoardId,
                position: 2,
                cards: [
                  {
                    id: uuidv4(),
                    name: 'Set up project repository',
                    list_id: doneListId,
                    labels: [{ color: 'bg-red-500', text: 'DevOps' }],
                    position: 0,
                    status: 'done',
                    created_by: 'current-user',
                    priority: 'medium',
                  },
                  {
                    id: uuidv4(),
                    name: 'Research competitors',
                    description: 'Analyze what similar products are doing in the market',
                    list_id: doneListId,
                    labels: [{ color: 'bg-orange-500', text: 'Research' }],
                    position: 1,
                    status: 'done',
                    created_by: 'current-user',
                    priority: 'low',
                  },
                  {
                    id: uuidv4(),
                    name: 'Gather requirements',
                    list_id: doneListId,
                    labels: [{ color: 'bg-indigo-500', text: 'Planning' }],
                    position: 2,
                    status: 'done',
                    created_by: 'current-user',
                    priority: 'high',
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    
    setWorkspaces(initialWorkspaces);
    setCurrentWorkspaceState(initialWorkspaces[0]);
    setCurrentBoardState(initialWorkspaces[0].boards[0]);
  }, []);

  const setCurrentWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find(w => w.id === workspaceId) || null;
    setCurrentWorkspaceState(workspace);
    
    // Set the first board of this workspace as current
    if (workspace && workspace.boards.length > 0) {
      setCurrentBoardState(workspace.boards[0]);
    } else {
      setCurrentBoardState(null);
    }
  };

  const setCurrentBoard = (boardId: string) => {
    if (!currentWorkspace) return;
    
    const board = currentWorkspace.boards.find(b => b.id === boardId) || null;
    setCurrentBoardState(board);
  };

  const addWorkspace = (title: string, description: string) => {
    const newWorkspace: Workspace = {
      id: uuidv4(),
      title,
      description,
      created_by: 'current-user',
      boards: [],
    };
    
    setWorkspaces([...workspaces, newWorkspace]);
    setCurrentWorkspaceState(newWorkspace);
  };

  const addBoard = (name: string, description: string, workspaceId: string, visibility: 'public' | 'private') => {
    const newBoard: Board = {
      id: uuidv4(),
      name,
      description,
      owner: 'current-user',
      members: ['current-user'],
      workspace_id: workspaceId,
      visibility,
      lists: [],
    };
    
    setWorkspaces(workspaces.map(workspace => {
      if (workspace.id === workspaceId) {
        return {
          ...workspace,
          boards: [...workspace.boards, newBoard],
        };
      }
      return workspace;
    }));
    
    if (currentWorkspace?.id === workspaceId) {
      setCurrentBoardState(newBoard);
    }
  };

  const addList = (boardId: string, title: string) => {
    const newList: List = {
      id: uuidv4(),
      title,
      board_id: boardId,
      cards: [],
      position: currentBoard?.lists.length || 0,
    };
    
    setWorkspaces(workspaces.map(workspace => ({
      ...workspace,
      boards: workspace.boards.map(board => {
        if (board.id === boardId) {
          return {
            ...board,
            lists: [...board.lists, newList],
          };
        }
        return board;
      }),
    })));
  };

  const addCard = (listId: string, name: string) => {
    if (!currentBoard) return;
    
    const newCard: Card = {
      id: uuidv4(),
      name,
      list_id: listId,
      position: currentBoard.lists.find(list => list.id === listId)?.cards.length || 0,
      status: 'todo',
      created_by: 'current-user',
      priority: 'medium',
    };
    
    setWorkspaces(workspaces.map(workspace => ({
      ...workspace,
      boards: workspace.boards.map(board => {
        if (board.id === currentBoard.id) {
          return {
            ...board,
            lists: board.lists.map(list => {
              if (list.id === listId) {
                return {
                  ...list,
                  cards: [...list.cards, newCard],
                };
              }
              return list;
            }),
          };
        }
        return board;
      }),
    })));
  };

  const updateCardPosition = (
    cardId: string,
    sourceListId: string,
    destinationListId: string,
    newPosition: number
  ) => {
    if (!currentBoard) return;
    
    // First, find the card and remove it from its source list
    let cardToMove: Card | undefined;
    
    setWorkspaces(workspaces.map(workspace => ({
      ...workspace,
      boards: workspace.boards.map(board => {
        if (board.id === currentBoard.id) {
          // Find and remove the card from its source list
          const updatedLists = board.lists.map(list => {
            if (list.id === sourceListId) {
              const cardIndex = list.cards.findIndex(card => card.id === cardId);
              if (cardIndex !== -1) {
                cardToMove = { ...list.cards[cardIndex], list_id: destinationListId };
                return {
                  ...list,
                  cards: list.cards.filter(card => card.id !== cardId),
                };
              }
            }
            return list;
          });
          
          // If we found the card, insert it into the destination list at the new position
          if (cardToMove) {
            return {
              ...board,
              lists: updatedLists.map(list => {
                if (list.id === destinationListId) {
                  const newCards = [...list.cards];
                  newCards.splice(newPosition, 0, cardToMove!);
                  
                  // Update positions for all cards in this list
                  const cardsWithUpdatedPositions = newCards.map((card, index) => ({
                    ...card,
                    position: index,
                  }));
                  
                  return {
                    ...list,
                    cards: cardsWithUpdatedPositions,
                  };
                }
                return list;
              }),
            };
          }
        }
        return board;
      }),
    })));
  };

  const updateListPosition = (listId: string, newPosition: number) => {
    if (!currentBoard) return;
    
    setWorkspaces(workspaces.map(workspace => ({
      ...workspace,
      boards: workspace.boards.map(board => {
        if (board.id === currentBoard.id) {
          // Find the list we want to move
          const listToMove = board.lists.find(list => list.id === listId);
          if (!listToMove) return board;
          
          // Remove the list from its current position
          const listsWithoutMovedList = board.lists.filter(list => list.id !== listId);
          
          // Insert the list at the new position
          const updatedLists = [...listsWithoutMovedList];
          updatedLists.splice(newPosition, 0, listToMove);
          
          // Update positions for all lists
          const listsWithUpdatedPositions = updatedLists.map((list, index) => ({
            ...list,
            position: index,
          }));
          
          return {
            ...board,
            lists: listsWithUpdatedPositions,
          };
        }
        return board;
      }),
    })));
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        currentWorkspace,
        currentBoard,
        setCurrentWorkspace,
        setCurrentBoard,
        addWorkspace,
        addBoard,
        addList,
        addCard,
        updateCardPosition,
        updateListPosition,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};
