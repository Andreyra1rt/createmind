import { UUID, ISOString } from '../domain/shared/types';
import { referenceWorkspaceFixture } from '../fixtures/referenceWorkspace';

export interface RecentActivityItem {
    id: UUID;
    timestamp: ISOString;
    actorName: string;
    action: string;
    details?: string;
}

export interface AgentSummary {
    total: number;
    active: number;
    waiting: number;
    blocked: number;
}

export interface WorkspaceOverviewViewModel {
    projectId: UUID;
    workspaceId: UUID;
    projectName: string;
    projectType: string;
    projectGoal: string;
    currentStageLabel: string;
    statusLabel: string;
    statusTone: 'info' | 'success' | 'warning' | 'error';
    nextAction: string;
    architectureStatus: string;
    activeTaskCount: number;
    completedTaskCount: number;
    totalTaskCount: number;
    agentSummary: AgentSummary;
    recentActivity: RecentActivityItem[];
}

export function createWorkspaceOverviewViewModel(fixture = referenceWorkspaceFixture): WorkspaceOverviewViewModel {
    const { project, workspace, architecture, agents, tasks, activities } = fixture;

    // 1. Определение семантики этапов на основе WorkspaceStage
    let currentStageLabel = 'Discovery';
    let statusLabel = 'Анализ проекта в процессе';
    let statusTone: 'info' | 'success' | 'warning' | 'error' = 'info';
    let nextAction = 'Завершить опросник';
    let architectureStatus = 'Draft';

    switch (workspace.currentStage) {
        case 'DISCOVERY':
        case 'THINKING':
        case 'UNDERSTANDING':
        case 'CLARIFYING':
            currentStageLabel = 'Discovery';
            statusLabel = 'Изучение контекста и опрос пользователя';
            statusTone = 'info';
            nextAction = 'Завершить опросник Discovery';
            architectureStatus = 'Draft';
            break;
        case 'SAVED':
            currentStageLabel = 'Architecture';
            statusLabel = 'Architecture сформирована и ожидает подтверждения';
            statusTone = 'warning';
            nextAction = 'Подтвердить архитектуру решения';
            architectureStatus = 'Generated';
            break;
        case 'DEVELOPMENT':
            currentStageLabel = 'Development';
            statusLabel = 'Разработка в процессе';
            statusTone = 'success';
            nextAction = 'Перейти к бэклогу задач';
            architectureStatus = 'Confirmed';
            break;
        case 'COMPLETED':
            currentStageLabel = 'Completed';
            statusLabel = 'Проект успешно завершен';
            statusTone = 'success';
            nextAction = 'Архивировать проект';
            architectureStatus = 'Confirmed';
            break;
    }

    // 2. Подсчет задач
    const totalTaskCount = tasks.length;
    const completedTaskCount = tasks.filter(t => t.status === 'done').length;
    const activeTaskCount = tasks.filter(t => t.status === 'in_progress').length;

    // 3. Сводка по ИИ-агентам
    const agentSummary: AgentSummary = {
        total: agents.length,
        active: agents.filter(a => a.status === 'processing').length,
        waiting: agents.filter(a => a.status === 'idle').length,
        blocked: agents.filter(a => a.status === 'offline').length
    };

    // 4. Последние 5 событий активности (по убыванию времени)
    const sortedActivities = [...activities]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

    const recentActivity: RecentActivityItem[] = sortedActivities.map(act => ({
        id: act.id,
        timestamp: act.timestamp,
        actorName: act.actor.name,
        action: act.action,
        details: act.details
    }));

    return {
        projectId: project.id,
        workspaceId: workspace.id,
        projectName: project.name,
        projectType: architecture.projectType,
        projectGoal: project.description,
        currentStageLabel,
        statusLabel,
        statusTone,
        nextAction,
        architectureStatus,
        activeTaskCount,
        completedTaskCount,
        totalTaskCount,
        agentSummary,
        recentActivity
    };
}
