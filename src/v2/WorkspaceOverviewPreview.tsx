import { createWorkspaceOverviewViewModel } from '../view-models/workspaceOverview';
import { referenceWorkspaceFixture } from '../fixtures/referenceWorkspace';
import { WorkspaceOverview } from './workspace/WorkspaceOverview';

export function WorkspaceOverviewPreview() {
  const viewModel = createWorkspaceOverviewViewModel(referenceWorkspaceFixture);
  
  const handleNextAction = () => {
    console.log('Next action clicked:', viewModel.nextAction);
  };

  return (
    <div className="workspace-preview-container">
      <WorkspaceOverview 
        viewModel={viewModel} 
        onNextAction={handleNextAction} 
      />
    </div>
  );
}
