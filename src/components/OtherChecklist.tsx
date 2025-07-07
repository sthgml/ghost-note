import React from 'react';
import { ChecklistItem, ChecklistStateMap, EvidenceState } from '../types/ghost';
import { CHECKLIST_ITEMS } from '../data/evidence';
import './OtherChecklist.css';

interface OtherChecklistProps {
  checklistState: ChecklistStateMap;
  onChecklistChange: (itemId: string, state: EvidenceState) => void;
}

const OtherChecklist: React.FC<OtherChecklistProps> = ({
  checklistState,
  onChecklistChange
}) => {
  const confirmedCount = Object.values(checklistState).filter(state => state === 'confirmed').length;
  const ruledOutCount = Object.values(checklistState).filter(state => state === 'ruled-out').length;

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
    <div className="other-checklist">
      <div className="checklist-header">
        <h2>기타 체크리스트</h2>
        <div className="checklist-controls">
          <div className="checklist-counts">
            <span className="count-item confirmed">확인됨: {confirmedCount}개</span>
            <span className="count-item ruled-out">제외됨: {ruledOutCount}개</span>
          </div>
          <button className="reset-button" onClick={() => {
            Object.keys(checklistState).forEach(key => {
              onChecklistChange(key, 'unknown');
            });
          }}>
            🔄 리셋
          </button>
        </div>
      </div>
      <div className="checklist-grid">
        {CHECKLIST_ITEMS.map((item) => {
          const currentState = checklistState[item.id] || 'unknown';
          
          return (
            <div key={item.id} className="checklist-item">
              <div className="checklist-info">
                <div className="checklist-name">{item.name}</div>
                <div className="checklist-description">{item.description}</div>
              </div>
              <button 
                className={`checklist-state-button ${getStateClass(currentState)}`}
                onClick={() => onChecklistChange(item.id, getNextState(currentState))}
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

export default OtherChecklist; 