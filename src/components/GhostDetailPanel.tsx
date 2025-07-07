import React from 'react';
import { Ghost, Evidence } from '../types/ghost';
import { EVIDENCE_NAMES, EVIDENCES } from '../data/evidence';
import { USER_REVIEWS } from '../data/userReviews';
import './GhostDetailPanel.css';

interface GhostDetailPanelProps {
  ghost: Ghost | null;
}

const GhostDetailPanel: React.FC<GhostDetailPanelProps> = ({ ghost }) => {
  if (!ghost) {
    return (
      <div className="ghost-detail-panel">
        <div className="no-selection">
          <h2>유령 상세 정보</h2>
          <p>유령을 선택하면 상세 정보가 표시됩니다.</p>
        </div>
      </div>
    );
  }

  const userReview = USER_REVIEWS[ghost.id];

  return (
    <div className="ghost-detail-panel">
      <h2>유령 상세 정보</h2>
      
      <div className="ghost-info">
        <h3>{ghost.name}</h3>
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

      <div className="info-section">
        <h3>증거</h3>
          <div className="evidence-list">
            {ghost.evidences.map((evidence, index) => (
            <span key={index} className="evidence-tag">
              {EVIDENCE_NAMES[evidence]}
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

      {userReview && (
        <div className="ghost-info-section">
          <h3>유저 후기</h3>
          <div className="user-review-warning">
            <span className="warning-icon">⚠️</span>
            <span className="warning-text">정확하지 않은 정보가 포함되어 있을 수 있습니다.</span>
          </div>
          <div className="user-review-content">
            {userReview.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GhostDetailPanel; 