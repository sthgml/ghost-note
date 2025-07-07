import React, { useState } from 'react';
import './App.css';
import EvidenceChecklist from './components/EvidenceChecklist';
import GhostList from './components/GhostList';
import GhostDetailPanel from './components/GhostDetailPanel';
import { EvidenceStateMap, Ghost } from './types/ghost';
import { GHOSTS } from './data/ghosts';

function App() {
  const [evidenceState, setEvidenceState] = useState<EvidenceStateMap>({});
  const [selectedGhost, setSelectedGhost] = useState<Ghost | null>(null);

  const handleEvidenceChange = (evidenceId: string, state: 'confirmed' | 'ruled-out' | 'unknown') => {
    setEvidenceState(prev => ({
      ...prev,
      [evidenceId]: state
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>👻 Ghost Note</h1>
        <p>파스모포비아 유령 판별 도우미</p>
      </header>
      
      <main className="App-main">
        <div className="left-panel">
          <EvidenceChecklist 
            evidenceState={evidenceState} 
            onEvidenceChange={handleEvidenceChange} 
          />
        </div>
        
        <div className="center-panel">
          <GhostList 
            ghosts={GHOSTS}
            evidenceState={evidenceState}
            selectedGhost={selectedGhost}
            onGhostSelect={setSelectedGhost}
          />
        </div>
        
        <div className="right-panel">
          <GhostDetailPanel ghost={selectedGhost} />
        </div>
      </main>
    </div>
  );
}

export default App;
