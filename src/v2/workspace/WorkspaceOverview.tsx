import { WorkspaceOverviewViewModel } from '../../view-models/workspaceOverview';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export type WorkspaceOverviewProps = {
  viewModel: WorkspaceOverviewViewModel;
  onNextAction?: () => void;
};

export function WorkspaceOverview({ viewModel, onNextAction }: WorkspaceOverviewProps) {
  const {
    projectName,
    projectType,
    currentStageLabel,
    nextAction,
    projectGoal
  } = viewModel;

  return (
    <div className="workspace-container">
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="nav-left">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
          <span>Workspace</span>
        </div>
        <div className="nav-right-avatar">AD</div>
      </header>

      {/* Main Header Section */}
      <section className="project-header-row">
        <div className="project-identity">
          <div className="project-logo-wrapper">
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className="project-title-desc">
            <h1>{projectName}</h1>
            <p>{projectGoal}</p>
          </div>
        </div>

        <div className="stage-card">
          <span className="label">Current Stage</span>
          <span className="value">{currentStageLabel}</span>
          <span className="badge">Stage 2 of 4</span>
        </div>
      </section>

      {/* AI Recommendation Section (Glass Card) */}
      <section className="ai-recommendation-card">
        <div className="rec-left">
          <div className="rec-tag">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>AI Recommendation</span>
          </div>
          <h2 className="rec-title">Architecture is ready.</h2>
          <p className="rec-desc">AI has analyzed your requirements and designed the solution architecture. The next logical step is to review and confirm the architecture before we generate the implementation plan and tasks.</p>
          
          <div className="why-block">
            <span className="why-title">Why this step?</span>
            <p className="why-text">Confirming the architecture ensures we build the right solution before investing time in detailed tasks and implementation.</p>
          </div>
        </div>

        <div className="cta-column">
          <div className="rec-right-visual">
            <img src="/architecture_layers.jpg" alt="Architecture layers" />
          </div>
          <button 
            type="button" 
            className="confirm-cta-btn"
            onClick={onNextAction}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>{nextAction}</span>
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <p className="cta-hint">This will unlock task generation and sprint planning</p>
        </div>
      </section>

      {/* Project Progress & Overall Progress Row */}
      <section className="progress-section">
        <div className="progress-left">
          <div className="progress-section-title">Project Progress</div>
          <div className="timeline-steps-row">
            <div className="timeline-line">
              <div className="timeline-line-fill"></div>
            </div>
            
            <div className="step-node completed">
              <div className="circle">✓</div>
              <span className="step-title">Discovery</span>
              <span className="step-status">Completed</span>
            </div>
            
            <div className="step-node active">
              <div className="circle">2</div>
              <span className="step-title">Architecture</span>
              <span className="step-status">In Progress</span>
            </div>
            
            <div className="step-node">
              <div className="circle">3</div>
              <span className="step-title">Implementation</span>
              <span className="step-status">Not Started</span>
            </div>
            
            <div className="step-node">
              <div className="circle">4</div>
              <span className="step-title">Review & Launch</span>
              <span className="step-status">Not Started</span>
            </div>
          </div>
        </div>

        <div className="overall-card">
          <span class="overall-title">Overall Progress</span>
          <span class="overall-value">37%</span>
          <div class="overall-bar-bg">
            <div class="overall-bar-fill"></div>
          </div>
          <span class="overall-hint">2 of 4 stages completed</span>
        </div>
      </section>

      {/* What's Done & Up Next Grid */}
      <section className="two-column-grid">
        {/* Left Column: What's Done */}
        <div className="column-card">
          <div className="column-header-title">What's Done</div>
          <div className="done-list">
            <div className="done-item">
              <div className="done-icon-wrapper">✓</div>
              <div className="done-content">
                <span className="done-title">Requirements analyzed</span>
                <span className="done-desc">AI Discovery completed</span>
              </div>
            </div>
            <div className="done-item">
              <div className="done-icon-wrapper">✓</div>
              <div className="done-content">
                <span className="done-title">Architecture designed</span>
                <span className="done-desc">Solution architecture created</span>
              </div>
            </div>
            <div className="done-item">
              <div className="done-icon-wrapper">✓</div>
              <div className="done-content">
                <span className="done-title">Task backlog created</span>
                <span className="done-desc">6 tasks mapped and ready</span>
              </div>
            </div>
          </div>
          
          <svg className="card-illustration-bg" viewBox="0 0 24 24" width="80" height="80" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path d="M9 11l3 3L22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>

          <a className="summary-link">
            <span>View full summary</span>
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        {/* Right Column: Up Next */}
        <div className="column-card">
          <div className="column-header-title">Up Next</div>
          <div className="up-next-list">
            <div className="next-task-card">
              <div className="task-left">
                <div class="task-icon-box">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                  </svg>
                </div>
                <div className="task-info-block">
                  <span className="task-card-title">Confirm Architecture</span>
                  <span className="task-card-desc">Review and approve the solution architecture</span>
                </div>
              </div>
              <svg className="task-arrow-right" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            <div className="next-task-card">
              <div className="task-left">
                <div class="task-icon-box">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </div>
                <div className="task-info-block">
                  <span className="task-card-title">Generate Implementation Plan</span>
                  <span className="task-card-desc">AI will create detailed implementation plan</span>
                </div>
              </div>
              <svg className="task-arrow-right" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>

            <div className="next-task-card">
              <div className="task-left">
                <div class="task-icon-box">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <div className="task-info-block">
                  <span className="task-card-title">Start Sprint Planning</span>
                  <span className="task-card-desc">Break down tasks into sprints</span>
                </div>
              </div>
              <svg className="task-arrow-right" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity Section */}
      <section className="activity-section">
        <div className="activity-title-row">Recent Activity</div>
        <div className="activity-table-list">
          <div className="activity-row">
            <div className="activity-left-side">
              <div className="activity-avatar">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="activity-text-info">
                <span className="actor-name">Sofia</span>
                <span className="action-details">updated task status (Prepare Launch Strategy marked as IN_PROGRESS)</span>
              </div>
            </div>
            <span className="activity-time-ago">2h ago</span>
          </div>

          <div className="activity-row completed-activity">
            <div className="activity-left-side">
              <div className="activity-avatar">✓</div>
              <div className="activity-text-info">
                <span className="actor-name">Daria</span>
                <span className="action-details">completed a task (Define Diagnostic Schema marked as DONE)</span>
              </div>
            </div>
            <span className="activity-time-ago">4h ago</span>
          </div>

          <div className="activity-row system-activity">
            <div className="activity-left-side">
              <div className="activity-avatar">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </div>
              <div className="activity-text-info">
                <span className="actor-name">System</span>
                <span className="action-details">uploaded file (architecture-scheme.png added to workspace)</span>
              </div>
            </div>
            <span className="activity-time-ago">6h ago</span>
          </div>
        </div>

        <a className="view-all-activity-link">
          <span>View all activity</span>
          <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </section>
    </div>
  );
}
