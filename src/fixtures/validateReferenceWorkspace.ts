import { referenceWorkspaceFixture } from './referenceWorkspace';

export interface ValidationReport {
    isValid: boolean;
    errors: string[];
    warnings: string[];
}

export function validateReferenceWorkspaceFixture(fixture = referenceWorkspaceFixture): ValidationReport {
    const errors: string[] = [];
    const warnings: string[] = [];

    const { project, workspace, architecture, agents, tasks, files, knowledge, activities } = fixture;

    // 1. Уникальность ID
    const allIds = new Set<string>();
    const checkIdUniqueness = (id: string, name: string) => {
        if (allIds.has(id)) {
            errors.push(`Duplicate ID found: "${id}" in entity "${name}"`);
        }
        allIds.add(id);
    };

    checkIdUniqueness(project.id, `Project: ${project.name}`);
    checkIdUniqueness(workspace.id, 'Workspace');
    checkIdUniqueness(architecture.id, 'Architecture');
    checkIdUniqueness(knowledge.id, 'Knowledge');

    architecture.modules.forEach(m => checkIdUniqueness(m.id, `Architecture Module: ${m.name}`));
    agents.forEach(a => checkIdUniqueness(a.id, `Agent: ${a.name}`));
    tasks.forEach(t => checkIdUniqueness(t.id, `Task: ${t.title}`));
    files.forEach(f => checkIdUniqueness(f.id, `File: ${f.name}`));
    activities.forEach(act => checkIdUniqueness(act.id, `Activity: ${act.action}`));

    // 2. Ссылки Workspace
    if (workspace.projectId !== project.id) {
        errors.push(`Workspace.projectId ("${workspace.projectId}") does not match Project.id ("${project.id}")`);
    }

    if (project.workspaceId !== workspace.id) {
        errors.push(`Project.workspaceId ("${project.workspaceId}") does not match Workspace.id ("${workspace.id}")`);
    }

    if (architecture.workspaceId !== workspace.id) {
        errors.push(`Architecture.workspaceId ("${architecture.workspaceId}") does not match Workspace.id ("${workspace.id}")`);
    }

    if (knowledge.workspaceId !== workspace.id) {
        errors.push(`Knowledge.workspaceId ("${knowledge.workspaceId}") does not match Workspace.id ("${workspace.id}")`);
    }

    // 3. Проверка списков Workspace на существование сущностей (no orphan links)
    const agentMap = new Map(agents.map(a => [a.id, a]));
    const taskMap = new Map(tasks.map(t => [t.id, t]));
    const fileMap = new Map(files.map(f => [f.id, f]));
    const activityMap = new Map(activities.map(a => [a.id, a]));

    workspace.agentIds.forEach(id => {
        if (!agentMap.has(id)) {
            errors.push(`Workspace references non-existent Agent ID: "${id}"`);
        }
    });

    workspace.taskIds.forEach(id => {
        if (!taskMap.has(id)) {
            errors.push(`Workspace references non-existent Task ID: "${id}"`);
        }
    });

    workspace.fileIds.forEach(id => {
        if (!fileMap.has(id)) {
            errors.push(`Workspace references non-existent File ID: "${id}"`);
        }
    });

    workspace.activityIds.forEach(id => {
        if (!activityMap.has(id)) {
            errors.push(`Workspace references non-existent Activity ID: "${id}"`);
        }
    });

    // Проверка на сиротские объекты (orphan entities), которые есть в фикстуре, но не в списках Workspace
    agents.forEach(a => {
        if (a.workspaceId !== workspace.id) {
            errors.push(`Agent "${a.name}" ("${a.id}") points to wrong workspaceId "${a.workspaceId}"`);
        }
        if (!workspace.agentIds.includes(a.id)) {
            errors.push(`Agent "${a.name}" ("${a.id}") exists in fixture, but is missing from Workspace.agentIds`);
        }
    });

    tasks.forEach(t => {
        if (t.workspaceId !== workspace.id) {
            errors.push(`Task "${t.title}" ("${t.id}") points to wrong workspaceId "${t.workspaceId}"`);
        }
        if (!workspace.taskIds.includes(t.id)) {
            errors.push(`Task "${t.title}" ("${t.id}") exists in fixture, but is missing from Workspace.taskIds`);
        }
    });

    files.forEach(f => {
        if (f.workspaceId !== workspace.id) {
            errors.push(`File "${f.name}" ("${f.id}") points to wrong workspaceId "${f.workspaceId}"`);
        }
        if (!workspace.fileIds.includes(f.id)) {
            errors.push(`File "${f.name}" ("${f.id}") exists in fixture, but is missing from Workspace.fileIds`);
        }
    });

    activities.forEach(act => {
        if (act.workspaceId !== workspace.id) {
            errors.push(`Activity "${act.action}" ("${act.id}") points to wrong workspaceId "${act.workspaceId}"`);
        }
        if (!workspace.activityIds.includes(act.id)) {
            errors.push(`Activity "${act.action}" ("${act.id}") exists in fixture, but is missing from Workspace.activityIds`);
        }
    });

    // 4. Проверка существования assignedAgentId у Tasks
    tasks.forEach(t => {
        if (t.assignedAgentId && !agentMap.has(t.assignedAgentId)) {
            errors.push(`Task "${t.title}" references non-existent Agent ID: "${t.assignedAgentId}"`);
        }
    });

    return {
        isValid: errors.length === 0,
        errors,
        warnings
    };
}
