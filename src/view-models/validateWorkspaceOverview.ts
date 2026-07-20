import { createWorkspaceOverviewViewModel } from './workspaceOverview';
import { referenceWorkspaceFixture } from '../fixtures/referenceWorkspace';

export interface OverviewValidationReport {
    isValid: boolean;
    errors: string[];
}

export function validateWorkspaceOverviewViewModel(): OverviewValidationReport {
    const errors: string[] = [];
    const viewModel = createWorkspaceOverviewViewModel(referenceWorkspaceFixture);

    // 1. Проверка лейбла стадии
    if (viewModel.currentStageLabel !== 'Architecture') {
        errors.push(`Expected currentStageLabel to be "Architecture", got "${viewModel.currentStageLabel}"`);
    }

    // 2. Проверка непустого действия
    if (!viewModel.nextAction || viewModel.nextAction.trim() === '') {
        errors.push('nextAction must not be empty');
    }

    // 3. Проверка количества задач
    if (viewModel.totalTaskCount !== 6) {
        errors.push(`Expected totalTaskCount to be 6, got ${viewModel.totalTaskCount}`);
    }

    // 4. Проверка вычисления активных и выполненных задач
    // В referenceWorkspace:
    // - task-1: status = 'done'
    // - task-2: status = 'todo'
    // - task-3: status = 'backlog'
    // - task-4: status = 'backlog'
    // - task-5: status = 'done'
    // - task-6: status = 'in_progress'
    // То есть: done = 2, in_progress = 1, backlog + todo = 3.
    if (viewModel.completedTaskCount !== 2) {
        errors.push(`Expected completedTaskCount to be 2, got ${viewModel.completedTaskCount}`);
    }

    if (viewModel.activeTaskCount !== 1) {
        errors.push(`Expected activeTaskCount to be 1, got ${viewModel.activeTaskCount}`);
    }

    // 5. Проверка длины ленты событий
    if (viewModel.recentActivity.length > 5) {
        errors.push(`Expected recentActivity length to be <= 5, got ${viewModel.recentActivity.length}`);
    }

    // 6. Проверка ссылок
    if (viewModel.projectId !== referenceWorkspaceFixture.project.id) {
        errors.push('projectId link mismatch');
    }

    if (viewModel.workspaceId !== referenceWorkspaceFixture.workspace.id) {
        errors.push('workspaceId link mismatch');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}
