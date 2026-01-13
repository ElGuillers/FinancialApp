import React from 'react';
import { useFinancial } from '../context/FinancialContext';
import Card from '../components/Card';
import AnalysisCard from '../components/AnalysisCard';
import { formatCurrency } from '../utils/formatters';

const Dashboard = () => {
    const { totalIncome, totalDebt, totalSavings, state } = useFinancial();
    const netBalance = totalIncome - totalDebt - totalSavings;

    return (
        <div style={{ paddingBottom: '80px' }}>
            <header style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '1.5rem' }}>Hola, Soñador</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Tu resumen financiero</p>
            </header>

            <Card title="Balance Total" className="balance-card">
                <div style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, #a0a0a0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {formatCurrency(netBalance)}
                </div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ingresos</div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: '600' }}>+{formatCurrency(totalIncome)}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Deudas</div>
                        <div style={{ color: 'var(--accent-red)', fontWeight: '600' }}>-{formatCurrency(totalDebt)}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ahorros</div>
                        <div style={{ color: 'var(--accent-gold)', fontWeight: '600' }}>-{formatCurrency(totalSavings)}</div>
                    </div>
                </div>
            </Card>

            <AnalysisCard monthlyIncome={totalIncome} totalDebt={totalDebt} />

            <h2 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Tus Metas</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {state.goals.length === 0 ? (
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>Aú no tienes metas. ¡Agrega una!</p>
                ) : (
                    state.goals.slice(0, 3).map(goal => (
                        <Card key={goal.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ fontWeight: '500' }}>{goal.description}</span>
                                <span style={{ color: 'var(--accent-gold)' }}>{formatCurrency(goal.targetAmount)}</span>
                            </div>
                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${Math.min((goal.currentAmount / goal.targetAmount) * 100, 100)}%`,
                                    height: '100%',
                                    background: 'var(--accent-gold)',
                                    transition: 'width 1s ease'
                                }} />
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Dashboard;
