import React from 'react';
import { EvidenceStateMap } from '../types/ghost';
import { GHOSTS } from '../data/ghosts';
import { isGhostEliminated, filterPossibleGhosts } from '../utils/ghostLogic';
import './GhostList.css';

interface GhostListProps {
  evidenceState: EvidenceStateMap;
}

const GhostList: React.FC<GhostListProps> = ({ evidenceState }) => {
  const possibleGhosts = filterPossibleGhosts(evidenceState);
  const confirmedEvidences = Object.keys(evidenceState).filter(key => evidenceState[key] === 'confirmed');
  const ruledOutEvidences = Object.keys(evidenceState).filter(key => evidenceState[key] === 'ruled-out');

  return (
    <div className="ghost-list">
      <h2>유령 목록</h2>
      
      {(confirmedEvidences.length > 0 || ruledOutEvidences.length > 0) && (
        <div className="ghost-summary">
          <div className="summary-item">
            <span className="summary-label">가능한 유령:</span>
            <span className="summary-value possible">{possibleGhosts.length}개</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">제거된 유령:</span>
            <span className="summary-value eliminated">{GHOSTS.length - possibleGhosts.length}개</span>
          </div>
        </div>
      )}

      <div className="ghost-grid">
        {GHOSTS.map((ghost) => {
          const eliminated = isGhostEliminated(ghost, evidenceState);
          const isPossible = possibleGhosts.some(g => g.id === ghost.id);
          
          return (
            <div 
              key={ghost.id} 
              className={`ghost-item ${eliminated ? 'eliminated' : ''} ${isPossible ? 'possible' : ''}`}
            >
              <div className="ghost-header">
                <h3 className="ghost-name">{ghost.name}</h3>
                {eliminated && <span className="eliminated-badge">제거됨</span>}
                {isPossible && !eliminated && <span className="possible-badge">가능</span>}
              </div>
              {ghost.description && (
                <p className="ghost-description">{ghost.description}</p>
              )}
              <div className="ghost-evidences">
                <span className="evidence-label">증거:</span>
                <div className="evidence-tags">
                  {ghost.evidences.map((evidenceId) => {
                    const evidenceNames: { [key: string]: string } = {
                      'emf5': 'EMF 5단계',
                      'spiritBox': '주파수 측정기',
                      'uv': 'UV 자외선',
                      'ghostOrb': '고스트 오브',
                      'ghostWriting': '고스트 라이팅',
                      'freezing': '서늘함',
                      'dots': '도트 프로젝터'
                    };
                    return (
                      <span key={evidenceId} className="evidence-tag">
                        {evidenceNames[evidenceId]}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GhostList; 