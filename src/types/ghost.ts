export interface Evidence {
  id: string;
  name: string;
  description: string;
}

export interface ChecklistItem {
  id: string;
  name: string;
  description: string;
  type: 'evidence' | 'other';
}

export type EvidenceName = 'emf5' | 'spiritBox' | 'dots' | 'uv' | 'ghostOrb' | 'ghostWriting' | 'freezing';

export interface Ghost {
  id: string;
  name: string;
  evidences: string[]; // evidence IDs
  description?: string;
  // 상세 정보 추가
  speed?: string;
  sanityThreshold?: string;
  huntCooldown?: string;
  roamingRange?: string;
  specialNotes?: string[];
  strengths?: string[];
  weaknesses?: string[];
}

export type EvidenceState = 'confirmed' | 'ruled-out' | 'unknown';

export interface EvidenceStateMap {
  [key: string]: EvidenceState; // evidence ID -> state
}

export interface ChecklistStateMap {
  [key: string]: EvidenceState; // checklist item ID -> state
} 