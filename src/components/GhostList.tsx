import React from 'react';
import { Ghost } from '../types/ghost';
import './GhostList.css';
import { isPossibleGhosts } from '../utils/ghostLogic';

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
  const getEvidenceNames = (evidenceIds: string[]) => {
    const evidenceNames: { [key: string]: string } = {
      'emf5': 'EMF 5단계',
      'spiritBox': '주파수 측정기',
      'uv': 'UV 자외선',
      'ghostOrb': '고스트 오브',
      'ghostWriting': '고스트 라이팅',
      'freezing': '서늘함',
      'dots': '도트 프로젝터'
    };
    return evidenceIds.map(id => evidenceNames[id] || id);
  };

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
              className={`ghost-card ${isSelected ? 'selected' : ''} ${isRuledOut || !isPossible ? 'ruled-out' : ''} `}
              onClick={() => handleGhostClick(ghost)}
            >
              <h3>{ghost.name}</h3>
              <p className="ghost-description">{ghost.description}</p>
              <div className="evidence-tags">
                {getEvidenceNames(ghost.evidences).map((evidence, index) => (
                  <span key={index} className="evidence-tag">
                    {evidence}
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