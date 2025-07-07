import { Ghost, EvidenceStateMap, EvidenceName } from '../types/ghost';

export const isPossibleGhosts = (ghost: Ghost, evidenceState: EvidenceStateMap): boolean => {
  const confirmedEvidences = Object.keys(evidenceState).filter(key => evidenceState[key] === 'confirmed');
  const ruledOutEvidences = Object.keys(evidenceState).filter(key => evidenceState[key] === 'ruled-out');

  // 확인된 증거가 유령의 증거에 모두 포함되어야 함
  const hasAllConfirmedEvidences = confirmedEvidences.every(evidence => 
    ghost.evidences.includes(evidence as EvidenceName)
  );

  // 제외된 증거가 유령의 증거에 포함되지 않아야 함
  const hasNoRuledOutEvidences = ruledOutEvidences.every(evidence => 
    !ghost.evidences.includes(evidence as EvidenceName)
  );

  return hasAllConfirmedEvidences && hasNoRuledOutEvidences;
};

export const isGhostEliminated = (ghost: Ghost, evidenceState: EvidenceStateMap): boolean => {
  const confirmedEvidences = Object.keys(evidenceState).filter(key => evidenceState[key] === 'confirmed');
  const ruledOutEvidences = Object.keys(evidenceState).filter(key => evidenceState[key] === 'ruled-out');
  
  // 확인된 증거 중 하나라도 유령이 가지고 있지 않으면 제거됨
  const missingConfirmedEvidence = confirmedEvidences.some(evidence => !ghost.evidences.includes(evidence as EvidenceName));
  
  // 제외된 증거 중 하나라도 유령이 가지고 있으면 제거됨
  const hasRuledOutEvidence = ruledOutEvidences.some(evidence => ghost.evidences.includes(evidence as EvidenceName));
  
  return missingConfirmedEvidence || hasRuledOutEvidence;
}; 