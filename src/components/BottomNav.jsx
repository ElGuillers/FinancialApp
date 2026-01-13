import React from 'react';
import { Home, Wallet, CreditCard, Target, Lightbulb } from 'lucide-react';

const BottomNav = ({ currentView, setView }) => {
    const navItems = [
        { id: 'dashboard', icon: Home, label: 'Inicio' },
        { id: 'income', icon: Wallet, label: 'Ingresos' },
        { id: 'debts', icon: CreditCard, label: 'Deudas' },
        { id: 'goals', icon: Target, label: 'Metas' },
        { id: 'tips', icon: Lightbulb, label: 'Tips' },
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'rgba(22, 22, 26, 0.95)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '12px 0 calc(24px + env(safe-area-inset-bottom))', // Safe area support
            zIndex: 9999,
            maxWidth: '480px', // Match app container
            margin: '0 auto', // Center if desktop
            boxShadow: '0 -4px 20px rgba(0,0,0,0.5)', // Better separation
        }}>
            {navItems.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            background: 'none',
                            color: isActive ? 'var(--accent-purple)' : 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            gap: '4px',
                            transition: 'color 0.2s',
                            width: '64px', // Ensure wide touch target
                            height: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <Icon size={24} />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default BottomNav;
