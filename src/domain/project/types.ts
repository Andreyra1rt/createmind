import { UUID, ISOString, Language } from '../shared/types';

export interface Project {
    id: UUID;
    name: string;
    description: string;
    language: Language;
    workspaceId: UUID;
    createdAt: ISOString;
    updatedAt: ISOString;
}
