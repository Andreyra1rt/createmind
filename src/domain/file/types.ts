import { UUID, ISOString } from '../shared/types';

export interface File {
    id: UUID;
    workspaceId: UUID;
    name: string;
    extension: string;
    sizeBytes: number;
    url: string;
    createdAt: ISOString;
}
