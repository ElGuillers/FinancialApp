import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Income from './pages/Income';
import Debts from './pages/Debts';
import Goals from './pages/Goals';
import Tips from './pages/Tips';
import BottomNav from './components/BottomNav';

function App() {
    const [currentView, setCurrentView] = useState('dashboard');

    const renderView = () => {
        switch (currentView) {
            case 'dashboard': return <Dashboard />;
            case 'income': return <Income />;
            case 'debts': return <Debts />;
            case 'goals': return <Goals />;
            case 'tips': return <Tips />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="app-container">
            <main style={{ flex: 1 }}>
                {renderView()}
            </main>
            <BottomNav currentView={currentView} setView={setCurrentView} />
        </div>
    );
}

export default App;
