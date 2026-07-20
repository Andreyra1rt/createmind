import { UUID } from '../shared/types';

export type WorkspaceStage =
    | 'DISCOVERY'
    | 'THINKING'
    | 'UNDERSTANDING'
    | 'CLARIFYING'
    | 'SAVED'
    | 'DEVELOPMENT'
    | 'COMPLETED';

export interface Workspace {
    id: UUID;
    projectId: UUID;
    currentStage: WorkspaceStage;
    architectureId: UUID;
    knowledgeId: UUID;
    taskIds: UUID[];
    agentIds: UUID[];
    fileIds: UUID[];
    activityIds: UUID[];
}
