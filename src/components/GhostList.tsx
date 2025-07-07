import React from 'react';
import { Ghost } from '../types/ghost';
import './GhostList.css';
import { isPossibleGhosts, calculateGhostScore, getPossibilityTags } from '../utils/ghostLogic';
import { EVIDENCE_NAMES } from '../data/evidence';

interface GhostListProps {
  ghosts: Ghost[];
  evidenceState: { [key: string]: 'confirmed' | 'ruled-out' | 'unknown' };
  checklistState: { [key: string]: 'confirmed' | 'ruled-out' | 'unknown' };
  selectedGhost: Ghost | null;
  onGhostSelect: (ghost: Ghost | null) => void;
}

const GhostList: React.FC<GhostListProps> = ({ 
  ghosts, 
  evidenceState, 
  checklistState,
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

  const renderPossibilityTags = (score: number) => {
    const { plus, minus } = getPossibilityTags(score);
    const tags = [];
    
    // + 태그들
    for (let i = 0; i < plus; i++) {
      tags.push(<span key={`plus-${i}`} className="possibility-tag plus">+</span>);
    }
    
    // - 태그들
    for (let i = 0; i < minus; i++) {
      tags.push(<span key={`minus-${i}`} className="possibility-tag minus">-</span>);
    }
    
    return tags;
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
          const score = calculateGhostScore(ghost, evidenceState, checklistState);
          
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
              <div className="ghost-header">
                <h3>{ghost.name}</h3>
                <div className="possibility-tags">
                  {renderPossibilityTags(score)}
                </div>
              </div>
              <p className="ghost-description">{ghost.description}</p>
              <div className="evidence-tags">
                {ghost.evidences.map((evidence, index) => (
                  <span key={index} className={`evidence-tag ${evidenceState[evidence] ?? 'unknown'}`}>
                    {EVIDENCE_NAMES[evidence]}
                  </span>
                ))}
              </div>
              <div className="ghost-score">
                점수: {score}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GhostList; 