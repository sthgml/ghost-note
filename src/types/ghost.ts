export interface Evidence {
  id: string;
  name: string;
  description: string;
}

export type EvidenceName = 'emf5' | 'spiritBox' | 'dots' | 'uv' | 'ghostOrb' | 'ghostWriting' | 'freezing';

export interface Ghost {
  id: string;
  name: string;
  evidences: EvidenceName[]; 
  description?: string;
}

export type EvidenceState = 'confirmed' | 'ruled-out' | 'unknown';

export interface EvidenceStateMap {
  [key: string]: EvidenceState; // evidence ID -> state
} 