import { Project } from '../domain/project/types';
import { Workspace } from '../domain/workspace/types';
import { Architecture } from '../domain/architecture/types';
import { Task } from '../domain/task/types';
import { Agent } from '../domain/agent/types';
import { File } from '../domain/file/types';
import { Knowledge } from '../domain/knowledge/types';
import { Activity } from '../domain/activity/types';

// Стабильные UUID для связей
export const PROJECT_ID = 'proj-11111111-1111-1111-1111-111111111111';
export const WORKSPACE_ID = 'work-22222222-2222-2222-2222-222222222222';
export const ARCHITECTURE_ID = 'arch-33222222-2222-2222-2222-222222222222';
export const KNOWLEDGE_ID = 'knol-55555555-5555-5555-5555-555555555555';

export const MODULE_1_ID = 'mod-1-33333333-3333-3333-3333-333333333333';
export const MODULE_2_ID = 'mod-2-33333333-3333-3333-3333-333333333333';
export const MODULE_3_ID = 'mod-3-33333333-3333-3333-3333-333333333333';

export const AGENT_PM_ID = 'age-pm-4444444-4444-4444-4444-444444444444';
export const AGENT_TL_ID = 'age-tl-4444444-4444-4444-4444-444444444444';
export const AGENT_ANALYST_ID = 'age-an-4444444-4444-4444-4444-444444444444';

export const TASK_1_ID = 'task-1-6666666-6666-6666-6666-666666666666';
export const TASK_2_ID = 'task-2-6666666-6666-6666-6666-666666666666';
export const TASK_3_ID = 'task-3-6666666-6666-6666-6666-666666666666';
export const TASK_4_ID = 'task-4-6666666-6666-6666-6666-666666666666';
export const TASK_5_ID = 'task-5-6666666-6666-6666-6666-666666666666';
export const TASK_6_ID = 'task-6-6666666-6666-6666-6666-666666666666';

export const FILE_1_ID = 'file-1-7777777-7777-7777-7777-777777777777';
export const FILE_2_ID = 'file-2-7777777-7777-7777-7777-777777777777';
export const FILE_3_ID = 'file-3-7777777-7777-7777-7777-777777777777';
export const FILE_4_ID = 'file-4-7777777-7777-7777-7777-777777777777';

export const ACT_1_ID = 'act-1-8888888-8888-8888-8888-888888888888';
export const ACT_2_ID = 'act-2-8888888-8888-8888-8888-888888888888';
export const ACT_3_ID = 'act-3-8888888-8888-8888-8888-888888888888';
export const ACT_4_ID = 'act-4-8888888-8888-8888-8888-888888888888';
export const ACT_5_ID = 'act-5-8888888-8888-8888-8888-888888888888';
export const ACT_6_ID = 'act-6-8888888-8888-8888-8888-888888888888';
export const ACT_7_ID = 'act-7-8888888-8888-8888-8888-888888888888';
export const ACT_8_ID = 'act-8-8888888-8888-8888-8888-888888888888';

// Инициализация единого набора связанных данных
export const referenceProject: Project = {
    id: PROJECT_ID,
    name: 'AI Home Advisor',
    description: 'Existing smart home consulting service modernization into an AI-driven personalized diagnostic solution.',
    language: 'ru',
    workspaceId: WORKSPACE_ID,
    createdAt: '2026-07-20T09:00:00Z',
    updatedAt: '2026-07-20T09:40:00Z'
};

export const referenceWorkspace: Workspace = {
    id: WORKSPACE_ID,
    projectId: PROJECT_ID,
    currentStage: 'SAVED',
    architectureId: ARCHITECTURE_ID,
    knowledgeId: KNOWLEDGE_ID,
    taskIds: [TASK_1_ID, TASK_2_ID, TASK_3_ID, TASK_4_ID, TASK_5_ID, TASK_6_ID],
    agentIds: [AGENT_PM_ID, AGENT_TL_ID, AGENT_ANALYST_ID],
    fileIds: [FILE_1_ID, FILE_2_ID, FILE_3_ID, FILE_4_ID],
    activityIds: [ACT_1_ID, ACT_2_ID, ACT_3_ID, ACT_4_ID, ACT_5_ID, ACT_6_ID, ACT_7_ID, ACT_8_ID]
};

export const referenceArchitecture: Architecture = {
    id: ARCHITECTURE_ID,
    workspaceId: WORKSPACE_ID,
    projectType: 'Existing product modernization',
    summary: 'Modernize traditional smart home setup consultation workflows into an intelligent self-service diagnostic ecosystem using GPT-5.5.',
    modules: [
        {
            id: MODULE_1_ID,
            name: 'Diagnostic Engine',
            description: 'Interactive questionnaire engine analyzing smart home requirements and electrical layouts.',
            status: 'pending'
        },
        {
            id: MODULE_2_ID,
            name: 'Report Generator',
            description: 'AI document assembler producing PDF reports with step-by-step installation guides.',
            status: 'pending'
        },
        {
            id: MODULE_3_ID,
            name: 'CRM Sync Bridge',
            description: 'Connector sending diagnostic results and follow-up tasks to internal CRM.',
            status: 'pending'
        }
    ],
    estimateWeeks: 4
};

export const referenceAgents: Agent[] = [
    {
        id: AGENT_PM_ID,
        workspaceId: WORKSPACE_ID,
        name: 'Sofia',
        role: 'pm',
        status: 'idle',
        avatarUrl: '/assets/avatars/sofia-pm.png'
    },
    {
        id: AGENT_TL_ID,
        workspaceId: WORKSPACE_ID,
        name: 'Nikolai',
        role: 'developer',
        status: 'idle',
        avatarUrl: '/assets/avatars/nikolai-tl.png'
    },
    {
        id: AGENT_ANALYST_ID,
        workspaceId: WORKSPACE_ID,
        name: 'Daria',
        role: 'analyst',
        status: 'idle',
        avatarUrl: '/assets/avatars/daria-analyst.png'
    }
];

export const referenceTasks: Task[] = [
    {
        id: TASK_1_ID,
        workspaceId: WORKSPACE_ID,
        title: 'Define Diagnostic Schema',
        description: 'Map out the logic rules and questionnaire tree for smart home diagnostics.',
        status: 'done',
        assignedAgentId: AGENT_ANALYST_ID,
        subtasks: [
            { id: 'sub-1-1', title: 'Collect smart home hardware catalogs', completed: true },
            { id: 'sub-1-2', title: 'Write rules for diagnostic algorithm', completed: true }
        ],
        createdAt: '2026-07-20T09:05:00Z',
        updatedAt: '2026-07-20T09:15:00Z'
    },
    {
        id: TASK_2_ID,
        workspaceId: WORKSPACE_ID,
        title: 'Implement Diagnostic UI Core',
        description: 'Develop dynamic forms for step-by-step smart home diagnostic questionnaires.',
        status: 'todo',
        assignedAgentId: AGENT_TL_ID,
        subtasks: [
            { id: 'sub-2-1', title: 'Create interactive form views', completed: false },
            { id: 'sub-2-2', title: 'Integrate dynamic validation rules', completed: false }
        ],
        createdAt: '2026-07-20T09:10:00Z',
        updatedAt: '2026-07-20T09:10:00Z'
    },
    {
        id: TASK_3_ID,
        workspaceId: WORKSPACE_ID,
        title: 'Report Template Design',
        description: 'Design dynamic PDF template with diagnostic charts and pricing metrics.',
        status: 'backlog',
        subtasks: [
            { id: 'sub-3-1', title: 'Format table layouts', completed: false },
            { id: 'sub-3-2', title: 'Embed SVG graphic icons', completed: false }
        ],
        createdAt: '2026-07-20T09:12:00Z',
        updatedAt: '2026-07-20T09:12:00Z'
    },
    {
        id: TASK_4_ID,
        workspaceId: WORKSPACE_ID,
        title: 'CRM Lead Integration',
        description: 'Synchronize generated lead records and diagnostic summaries with CRM API.',
        status: 'backlog',
        subtasks: [
            { id: 'sub-4-1', title: 'Setup webhook endpoints', completed: false }
        ],
        createdAt: '2026-07-20T09:14:00Z',
        updatedAt: '2026-07-20T09:14:00Z'
    },
    {
        id: TASK_5_ID,
        workspaceId: WORKSPACE_ID,
        title: 'Define Project Architecture',
        description: 'Establish modules list, database schema drafts, and network topology.',
        status: 'done',
        assignedAgentId: AGENT_TL_ID,
        subtasks: [
            { id: 'sub-5-1', title: 'Draft high-level schema', completed: true },
            { id: 'sub-5-2', title: 'Review security guidelines', completed: true }
        ],
        createdAt: '2026-07-20T09:02:00Z',
        updatedAt: '2026-07-20T09:08:00Z'
    },
    {
        id: TASK_6_ID,
        workspaceId: WORKSPACE_ID,
        title: 'Prepare Launch Strategy',
        description: 'Create launch roadmap and setup staging servers for diagnostic runs.',
        status: 'in_progress',
        assignedAgentId: AGENT_PM_ID,
        subtasks: [
            { id: 'sub-6-1', title: 'Draft server parameters requirements', completed: true },
            { id: 'sub-6-2', title: 'Set up staging environment', completed: false }
        ],
        createdAt: '2026-07-20T09:18:00Z',
        updatedAt: '2026-07-20T09:25:00Z'
    }
];

export const referenceFiles: File[] = [
    {
        id: FILE_1_ID,
        workspaceId: WORKSPACE_ID,
        name: 'Technical_Specification.pdf',
        extension: 'pdf',
        sizeBytes: 154200,
        url: '/files/Technical_Specification.pdf',
        createdAt: '2026-07-20T09:16:00Z'
    },
    {
        id: FILE_2_ID,
        workspaceId: WORKSPACE_ID,
        name: 'diagnostic-rules.json',
        extension: 'json',
        sizeBytes: 4200,
        url: '/files/diagnostic-rules.json',
        createdAt: '2026-07-20T09:07:00Z'
    },
    {
        id: FILE_3_ID,
        workspaceId: WORKSPACE_ID,
        name: 'architecture-scheme.png',
        extension: 'png',
        sizeBytes: 812000,
        url: '/files/architecture-scheme.png',
        createdAt: '2026-07-20T09:06:00Z'
    },
    {
        id: FILE_4_ID,
        workspaceId: WORKSPACE_ID,
        name: 'lead-schema.graphql',
        extension: 'graphql',
        sizeBytes: 1200,
        url: '/files/lead-schema.graphql',
        createdAt: '2026-07-20T09:13:00Z'
    }
];

export const referenceKnowledge: Knowledge = {
    id: KNOWLEDGE_ID,
    workspaceId: WORKSPACE_ID,
    facts: [
        'У пользователя есть действующий бизнес по ручному проектированию умных домов.',
        'Система должна обрабатывать входящие диагностические заявки автоматически.',
        'Для работы ИИ-агентов требуется полная база каталогов оборудования умных домов.'
    ],
    rules: [
        'По результатам диагностики должен формироваться PDF отчет с рекомендациями.',
        'Все данные о лидах должны отправляться во внешнюю CRM.',
        'ИИ-консультации должны осуществляться без длительного ожидания.'
    ],
    customContext: 'Целевая аудитория — владельцы загородных домов, желающие самостоятельно подобрать базовое оборудование.'
};

export const referenceActivities: Activity[] = [
    {
        id: ACT_1_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:00:00Z',
        actor: { id: 'usr-1', name: 'User', type: 'user' },
        action: 'Submitted query via Hero',
        details: 'Modernize traditional smart home setup consultation workflows'
    },
    {
        id: ACT_2_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:01:00Z',
        actor: { id: 'sys-1', name: 'System', type: 'system' },
        action: 'AI Discovery phase started',
        details: 'Initializing discovery process on VDS server'
    },
    {
        id: ACT_3_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:02:00Z',
        actor: { id: AGENT_TL_ID, name: 'Nikolai', type: 'agent' },
        action: 'Drafted Technical Architecture',
        details: 'Generated diagnostic-rules and architecture-scheme layout'
    },
    {
        id: ACT_4_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:06:00Z',
        actor: { id: 'sys-1', name: 'System', type: 'system' },
        action: 'File generated',
        details: 'architecture-scheme.png uploaded to workspace files storage'
    },
    {
        id: ACT_5_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:08:00Z',
        actor: { id: AGENT_TL_ID, name: 'Nikolai', type: 'agent' },
        action: 'Completed task',
        details: 'Define Project Architecture marked as DONE'
    },
    {
        id: ACT_6_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:10:00Z',
        actor: { id: AGENT_PM_ID, name: 'Sofia', type: 'agent' },
        action: 'Created task backlog',
        details: '6 tasks mapped in Workspace backlog'
    },
    {
        id: ACT_7_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:15:00Z',
        actor: { id: AGENT_ANALYST_ID, name: 'Daria', type: 'agent' },
        action: 'Completed task',
        details: 'Define Diagnostic Schema marked as DONE'
    },
    {
        id: ACT_8_ID,
        workspaceId: WORKSPACE_ID,
        timestamp: '2026-07-20T09:20:00Z',
        actor: { id: AGENT_PM_ID, name: 'Sofia', type: 'agent' },
        action: 'In progress task',
        details: 'Prepare Launch Strategy marked as IN_PROGRESS'
    }
];

export const referenceWorkspaceFixture = {
    project: referenceProject,
    workspace: referenceWorkspace,
    architecture: referenceArchitecture,
    agents: referenceAgents,
    tasks: referenceTasks,
    files: referenceFiles,
    knowledge: referenceKnowledge,
    activities: referenceActivities
};
