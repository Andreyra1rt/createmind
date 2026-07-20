import { UUID, ISOString } from '../shared/types';

export interface SubTask {
    id: UUID;
    title: string;
    completed: boolean;
}

export interface Task {
    id: UUID;
    workspaceId: UUID;
    title: string;
    description: string;
    status: 'backlog' | 'todo' | 'in_progress' | 'done';
    assignedAgentId?: UUID;
    subtasks: SubTask[];
    createdAt: ISOString;
    updatedAt: ISOString;
}
