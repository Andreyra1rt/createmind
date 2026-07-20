import { UUID } from '../shared/types';

export interface ArchitectureModule {
    id: UUID;
    name: string;
    description: string;
    status: 'pending' | 'in_progress' | 'completed';
}

export interface Architecture {
    id: UUID;
    workspaceId: UUID;
    projectType: string;
    summary: string;
    modules: ArchitectureModule[];
    estimateWeeks: number;
}
