import React from 'react';
import { Evidence, EvidenceStateMap, EvidenceState } from '../types/ghost';
import { EVIDENCES } from '../data/evidence';
import './EvidenceChecklist.css';

interface EvidenceChecklistProps {
  evidenceState: EvidenceStateMap;
  onEvidenceChange: (evidenceId: string, state: EvidenceState) => void;
}

const EvidenceChecklist: React.FC<EvidenceChecklistProps> = ({
  evidenceState,
  onEvidenceChange
}) => {
  const confirmedCount = Object.values(evidenceState).filter(state => state === 'confirmed').length;
  const ruledOutCount = Object.values(evidenceState).filter(state => state === 'ruled-out').length;

  const getNextState = (currentState: EvidenceState): EvidenceState => {
    switch (currentState) {
      case 'unknown':
        return 'confirmed';
      case 'confirmed':
        return 'ruled-out';
      case 'ruled-out':
        return 'unknown';
      default:
        return 'unknown';
    }
  };

  const getStateLabel = (state: EvidenceState): string => {
    switch (state) {
      case 'confirmed':
        return 'O';
      case 'ruled-out':
        return 'X';
      case 'unknown':
        return '?';
      default:
        return '?';
    }
  };

  const getStateClass = (state: EvidenceState): string => {
    switch (state) {
      case 'confirmed':
        return 'confirmed';
      case 'ruled-out':
        return 'ruled-out';
      case 'unknown':
        return 'unknown';
      default:
        return 'unknown';
    }
  };

  return (
    <div className="evidence-checklist">
      <div className="evidence-header">
        <h2>증거 체크리스트</h2>
        <div className="evidence-controls">
          <div className="evidence-counts">
            <span className="count-item confirmed">확인됨: {confirmedCount}개</span>
            <span className="count-item ruled-out">제외됨: {ruledOutCount}개</span>
          </div>
          <button className="reset-button" onClick={() => {
            const newState: EvidenceStateMap = {};
            Object.keys(evidenceState).forEach(key => {
              newState[key] = 'unknown';
            });
            // 모든 증거를 unknown으로 리셋
            Object.keys(evidenceState).forEach(key => {
              onEvidenceChange(key, 'unknown');
            });
          }}>
            🔄 리셋
          </button>
        </div>
      </div>
      <div className="evidence-grid">
        {EVIDENCES.map((evidence) => {
          const currentState = evidenceState[evidence.id] || 'unknown';
          
          return (
            <div key={evidence.id} className="evidence-item">
              <div className="evidence-info">
                <div className="evidence-name">{evidence.name}</div>
                <div className="evidence-description">{evidence.description}</div>
              </div>
              <button 
                className={`evidence-state-button ${getStateClass(currentState)}`}
                onClick={() => onEvidenceChange(evidence.id, getNextState(currentState))}
              >
                {getStateLabel(currentState)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EvidenceChecklist; 