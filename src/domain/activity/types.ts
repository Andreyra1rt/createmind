import { UUID, ISOString } from '../shared/types';

export interface ActivityActor {
    id: UUID;
    name: string;
    type: 'user' | 'agent' | 'system';
}

export interface Activity {
    id: UUID;
    workspaceId: UUID;
    timestamp: ISOString;
    actor: ActivityActor;
    action: string;
    details?: string;
}
