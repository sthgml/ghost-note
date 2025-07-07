import React from 'react';
import { Ghost, Evidence } from '../types/ghost';
import { EVIDENCES } from '../data/evidence';
import './GhostDetailPanel.css';

interface GhostDetailPanelProps {
  ghost: Ghost | null;
}

const GhostDetailPanel: React.FC<GhostDetailPanelProps> = ({ ghost }) => {
  if (!ghost) {
    return (
      <div className="ghost-detail-panel empty">
        <div className="empty-state">
          <h3>유령 정보</h3>
          <p>유령을 선택하면 자세한 정보를 볼 수 있습니다.</p>
        </div>
      </div>
    );
  }

  const getEvidenceNames = (evidenceIds: string[]) => {
    return evidenceIds.map(id => EVIDENCES.find((e: Evidence) => e.id === id)?.name || id);
  };

  return (
    <div className="ghost-detail-panel">
      <div className="ghost-header">
        <h2>{ghost.name}</h2>
        <p className="ghost-description">{ghost.description}</p>
      </div>

      <div className="ghost-info-section">
        <h3>기본 정보</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">이동 속도:</span>
            <span className="info-value">{ghost.speed}</span>
          </div>
          <div className="info-item">
            <span className="info-label">사냥 임계점:</span>
            <span className="info-value">{ghost.sanityThreshold}</span>
          </div>
          <div className="info-item">
            <span className="info-label">사냥 쿨타임:</span>
            <span className="info-value">{ghost.huntCooldown}</span>
          </div>
          <div className="info-item">
            <span className="info-label">로밍 범위:</span>
            <span className="info-value">{ghost.roamingRange}</span>
          </div>
        </div>
      </div>

      <div className="ghost-info-section">
        <h3>증거</h3>
        <div className="evidence-list">
          {getEvidenceNames(ghost.evidences).map((evidence, index) => (
            <span key={index} className="evidence-tag">
              {evidence}
            </span>
          ))}
        </div>
      </div>

      {ghost.strengths && ghost.strengths.length > 0 && (
        <div className="ghost-info-section">
          <h3>강점</h3>
          <ul className="info-list">
            {ghost.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
      )}

      {ghost.weaknesses && ghost.weaknesses.length > 0 && (
        <div className="ghost-info-section">
          <h3>약점</h3>
          <ul className="info-list">
            {ghost.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
      )}

      {ghost.specialNotes && ghost.specialNotes.length > 0 && (
        <div className="ghost-info-section">
          <h3>특이사항</h3>
          <ul className="info-list">
            {ghost.specialNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GhostDetailPanel; 