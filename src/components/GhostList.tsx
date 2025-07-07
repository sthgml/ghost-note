import React, { useState, useMemo } from 'react';
import { Ghost } from '../types/ghost';
import './GhostList.css';
import { isPossibleGhosts, calculateGhostScore, getPossibilityTags } from '../utils/ghostLogic';
import { EVIDENCE_NAMES } from '../data/evidence';

type SortOption = 'score' | 'none';

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
  const [sortOption, setSortOption] = useState<SortOption>('none');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 정렬된 유령 목록 계산
  const sortedGhosts = useMemo(() => {
    if (sortOption === 'none') {
      return ghosts;
    }
    
    return [...ghosts].sort((a, b) => {
      const scoreA = calculateGhostScore(a, evidenceState, checklistState);
      const scoreB = calculateGhostScore(b, evidenceState, checklistState);
      
      // 점수 순 정렬 (높은 점수가 위로)
      return scoreB - scoreA;
    });
  }, [ghosts, evidenceState, checklistState, sortOption]);

  const handleGhostClick = (ghost: Ghost) => {
    if (selectedGhost?.id === ghost.id) {
      onGhostSelect(null); // 같은 유령을 다시 클릭하면 선택 해제
    } else {
      onGhostSelect(ghost);
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  const getSortButtonText = () => {
    switch (sortOption) {
      case 'score':
        return '점수 순';
      case 'none':
        return '정렬 없음';
      default:
        return '정렬';
    }
  };

  return (
    <div className="ghost-list">
      <div className="ghost-list-header">
        <h2>유령 목록 ({sortedGhosts.length})</h2>
        <div className="sort-container">
          <button 
            className="sort-button"
            onClick={toggleDropdown}
          >
            {getSortButtonText()}
            <span className="dropdown-arrow">▼</span>
          </button>
          {isDropdownOpen && (
            <div className="sort-dropdown">
              <button 
                className={`sort-option ${sortOption === 'score' ? 'active' : ''}`}
                onClick={() => handleSortChange('score')}
              >
                점수 순
              </button>
              <button 
                className={`sort-option ${sortOption === 'none' ? 'active' : ''}`}
                onClick={() => handleSortChange('none')}
              >
                정렬 없음
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="ghosts-grid">
        {sortedGhosts.map((ghost) => {
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