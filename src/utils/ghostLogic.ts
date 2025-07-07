import { Ghost, EvidenceStateMap, ChecklistStateMap } from '../types/ghost';
import { GHOSTS } from '../data/ghosts';

export function isGhostEliminated(ghost: Ghost, evidenceState: EvidenceStateMap): boolean {
  // 유령이 가진 증거 중 하나라도 제외되면 해당 유령도 제외
  return ghost.evidences.some(evidence => evidenceState[evidence] === 'ruled-out');
}

export function isPossibleGhosts(ghost: Ghost, evidenceState: EvidenceStateMap): boolean {
  return !isGhostEliminated(ghost, evidenceState);
}

export function filterPossibleGhosts(evidenceState: EvidenceStateMap): Ghost[] {
  return GHOSTS.filter(ghost => !isGhostEliminated(ghost, evidenceState));
}

// 유령의 가능성 점수 계산
export function calculateGhostScore(ghost: Ghost, evidenceState: EvidenceStateMap, checklistState: ChecklistStateMap): number {
  let score = 0;
  
  // 기본 점수: 가능한 유령이면 0, 제외된 유령이면 -100
  if (isGhostEliminated(ghost, evidenceState)) {
    return -100;
  }
  
  // 확인된 증거에 따른 점수
  const confirmedEvidences = ghost.evidences.filter(evidence => evidenceState[evidence] === 'confirmed');
  score += confirmedEvidences.length * 10; // 확인된 증거당 +10점
  
  // 제외된 증거에 따른 점수 (다른 유령의 증거가 제외되면 이 유령의 가능성 증가)
  const ruledOutEvidences = Object.keys(evidenceState).filter(key => evidenceState[key] === 'ruled-out');
  const ghostHasRuledOutEvidence = ghost.evidences.some(evidence => ruledOutEvidences.includes(evidence));
  if (!ghostHasRuledOutEvidence && ruledOutEvidences.length > 0) {
    score += 5; // 다른 유령의 증거가 제외되면 +5점
  }
  
  // 체크리스트에 따른 점수
  const roomChanged = checklistState['roomChanged'];
  const lightsOff = checklistState['lightsOff'];
  
  // 유령 방 변경됨 체크 시
  if (roomChanged === 'confirmed') {
    // 레이스, 팬텀, 밴시는 가능성 증가
    if (['wraith', 'phantom', 'banshee'].includes(ghost.id)) {
      score += 15;
    }
    // 고료는 가능성 감소
    else if (ghost.id === 'goryo') {
      score -= 15;
    }
  }
  
  // 불 끔 체크 시 (향후 확장 가능)
  if (lightsOff === 'confirmed') {
    // 메어는 불이 꺼져있을 때 가능성 증가
    if (ghost.id === 'mare') {
      score += 15;
    }
  }
  
  return score;
}

// 유령의 가능성 레벨 계산
export function getGhostPossibilityLevel(score: number): 'high' | 'medium' | 'low' | 'eliminated' {
  if (score < 0) return 'eliminated';
  if (score >= 20) return 'high';
  if (score >= 10) return 'medium';
  return 'low';
}

// 가능성 점수에 따른 +/- 태그 개수 계산
export function getPossibilityTags(score: number): { plus: number; minus: number } {
  if (score < 0) {
    return { plus: 0, minus: Math.min(Math.abs(score) / 10, 5) }; // 최대 5개
  }
  
  const plus = Math.min(score / 10, 5); // 최대 5개
  return { plus: Math.floor(plus), minus: 0 };
} 