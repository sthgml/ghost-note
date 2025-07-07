import React, { useState } from 'react';
import './App.css';
import EvidenceChecklist from './components/EvidenceChecklist';
import GhostList from './components/GhostList';
import { EvidenceStateMap, EvidenceState } from './types/ghost';

function App() {
  const [evidenceState, setEvidenceState] = useState<EvidenceStateMap>({});

  const handleEvidenceChange = (evidenceId: string, state: EvidenceState) => {
    setEvidenceState(prev => ({
      ...prev,
      [evidenceId]: state
    }));
  };

  const handleReset = () => {
    setEvidenceState({});
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>👻 Ghost Note</h1>
        <p>파스모포비아 유령 일지</p>
      </header>
      <main className="App-main">
        <EvidenceChecklist 
          evidenceState={evidenceState}
          onEvidenceChange={handleEvidenceChange}
          onReset={handleReset}
        />
        <GhostList evidenceState={evidenceState} />
      </main>
    </div>
  );
}

export default App;
