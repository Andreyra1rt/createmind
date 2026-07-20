import { UUID } from '../shared/types';

export interface Knowledge {
    id: UUID;
    workspaceId: UUID;
    facts: string[];
    rules: string[];
    customContext?: string;
}
