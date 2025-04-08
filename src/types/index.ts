
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';
export type Visibility = 'public' | 'private';

export interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
}

export interface Workspace {
  id: string;
  title: string;
  description: string;
  created_by: string;
  boards: Board[];
}

export interface Board {
  id: string;
  name: string;
  description: string;
  owner: string;
  members: string[];
  workspace_id: string;
  visibility: Visibility;
  lists: List[];
}

export interface List {
  id: string;
  title: string;
  board_id: string;
  cards: Card[];
  position: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
}

export interface Card {
  id: string;
  name: string;
  description?: string;
  list_id: string;
  attachments?: Attachment[];
  start_date?: Date;
  members?: string[];
  labels?: { color: string; text?: string }[];
  priority?: Priority;
  position: number;
  status: Status;
  created_by: string;
}
