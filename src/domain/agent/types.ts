import { UUID } from '../shared/types';

export type AgentRole = 'architect' | 'pm' | 'developer' | 'analyst' | 'qa' | 'support';
export type AgentStatus = 'idle' | 'processing' | 'offline';

export interface Agent {
    id: UUID;
    workspaceId: UUID;
    name: string;
    role: AgentRole;
    status: AgentStatus;
    avatarUrl?: string;
}
