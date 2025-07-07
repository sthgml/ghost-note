import React from 'react';
import { Ghost } from '../types/ghost';
import './GhostList.css';
import { isPossibleGhosts } from '../utils/ghostLogic';
import { EVIDENCE_NAMES } from '../data/evidence';

interface GhostListProps {
  ghosts: Ghost[];
  evidenceState: { [key: string]: 'confirmed' | 'ruled-out' | 'unknown' };
  selectedGhost: Ghost | null;
  onGhostSelect: (ghost: Ghost | null) => void;
}

const GhostList: React.FC<GhostListProps> = ({ 
  ghosts, 
  evidenceState, 
  selectedGhost,
  onGhostSelect 
}) => {

  const handleGhostClick = (ghost: Ghost) => {
    if (selectedGhost?.id === ghost.id) {
      onGhostSelect(null); // 같은 유령을 다시 클릭하면 선택 해제
    } else {
      onGhostSelect(ghost);
    }
  };

  return (
    <div className="ghost-list">
      <h2>유령 목록 ({ghosts.length})</h2>
      <div className="ghosts-grid">
        {ghosts.map((ghost) => {
          const isSelected = selectedGhost?.id === ghost.id;
          const isRuledOut = ghost.evidences.some(evidence => 
            evidenceState[evidence] === 'ruled-out'
          );
          const isPossible = isPossibleGhosts(ghost, evidenceState);
          
          return (
            <div
              key={ghost.id}
              className={
                `ghost-card ${
                  isSelected ? 'selected' : ''
                } ${
                  isRuledOut || !isPossible ? 'ruled-out' : ''
                }`
              }
              onClick={() => handleGhostClick(ghost)}
            >
              <h3>{ghost.name}</h3>
              <p className="ghost-description">{ghost.description}</p>
              <div className="evidence-tags">
                {ghost.evidences.map((evidence, index) => (
                  <span key={index} className={`evidence-tag ${evidenceState[evidence] ?? 'unknown'}`}>
                    {EVIDENCE_NAMES[evidence]}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GhostList; 