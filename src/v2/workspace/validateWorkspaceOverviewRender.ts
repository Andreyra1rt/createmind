import { WorkspaceOverviewViewModel } from '../../view-models/workspaceOverview';

export interface RenderValidationReport {
  isValid: boolean;
  errors: string[];
}

export function validateWorkspaceOverviewRender(viewModel: WorkspaceOverviewViewModel): RenderValidationReport {
  const errors: string[] = [];

  // 1. Обязательные поля view model переданы
  if (!viewModel.projectId) errors.push('Missing projectId');
  if (!viewModel.workspaceId) errors.push('Missing workspaceId');
  if (!viewModel.projectName) errors.push('Missing projectName');
  if (!viewModel.projectType) errors.push('Missing projectType');
  if (!viewModel.projectGoal) errors.push('Missing projectGoal');
  if (!viewModel.currentStageLabel) errors.push('Missing currentStageLabel');
  if (!viewModel.statusLabel) errors.push('Missing statusLabel');
  if (!viewModel.statusTone) errors.push('Missing statusTone');
  if (!viewModel.nextAction) errors.push('Missing nextAction');

  // 2. currentStageLabel === "Architecture"
  if (viewModel.currentStageLabel !== 'Architecture') {
    errors.push(`Expected currentStageLabel to be "Architecture", got "${viewModel.currentStageLabel}"`);
  }

  // 3. nextAction присутствует
  if (!viewModel.nextAction || viewModel.nextAction.trim() === '') {
    errors.push('nextAction must be a non-empty string');
  }

  // 4. recentActivity не превышает 5 событий
  if (viewModel.recentActivity.length > 5) {
    errors.push(`Expected recentActivity length to be <= 5, got ${viewModel.recentActivity.length}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
