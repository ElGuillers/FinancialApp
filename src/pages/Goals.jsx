import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { Plus, Trash2, TrendingUp, Check, ChevronDown, ChevronUp, Minus, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const Goals = () => {
    const { state, dispatch, totalIncome } = useFinancial();
    const [showForm, setShowForm] = useState(false);
    const [description, setDescription] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [editAmount, setEditAmount] = useState('');
    const [expandedGoalId, setExpandedGoalId] = useState(null);
    const [transactionAmount, setTransactionAmount] = useState('');

    const handleAddGoal = (e) => {
        e.preventDefault();
        if (!description || !targetAmount) return;
        dispatch({
            type: 'ADD_GOAL',
            payload: {
                description,
                targetAmount: Number(targetAmount)
            }
        });
        setDescription('');
        setTargetAmount('');
        setShowForm(false);
    };

    const handleTransaction = (goal, type) => {
        if (!transactionAmount) return;
        const amount = Number(transactionAmount);
        const newAmount = type === 'deposit'
            ? goal.currentAmount + amount
            : Math.max(0, goal.currentAmount - amount); // Prevent negative

        dispatch({
            type: 'UPDATE_GOAL_PROGRESS',
            payload: {
                id: goal.id,
                amount: newAmount
            }
        });
        setTransactionAmount('');
    };

    const toggleExpand = (id) => {
        if (expandedGoalId === id) {
            setExpandedGoalId(null);
        } else {
            setExpandedGoalId(id);
            setTransactionAmount('');
        }
    };

    return (
        <div style={{ paddingBottom: '100px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1>Sueños</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-icon-filled" style={{ background: 'var(--accent-gold)', color: 'black' }}>
                    <Plus size={24} />
                </button>
            </header>

            {showForm && (
                <Card title="Nuevo Sueño" className="slide-down">
                    <form onSubmit={handleAddGoal}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <Input
                                label="¿Qué quieres lograr?"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Ej. Viaje a Europa"
                            />
                            <Input
                                label="Monto Objetivo"
                                type="number"
                                value={targetAmount}
                                onChange={e => setTargetAmount(e.target.value)}
                                placeholder="0.00"
                            />
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Button type="button" onClick={() => setShowForm(false)} style={{ background: 'rgba(255,255,255,0.1)' }}>Cancelar</Button>
                                <Button type="submit" style={{ background: 'var(--accent-gold)', color: 'black' }}>Guardar Meta</Button>
                            </div>
                        </div>
                    </form>
                </Card>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {state.goals.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>Define tus sueños y alcánzalos.</p>
                ) : (
                    state.goals.map(item => (
                        <Card key={item.id} className="list-item">
                            <div
                                onClick={() => toggleExpand(item.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                                    <div style={{ fontWeight: '600', fontSize: '1.1rem' }}>{item.description}</div>
                                    {expandedGoalId === item.id ? <ChevronUp size={20} color="var(--text-secondary)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                                    <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{formatCurrency(item.currentAmount)}</span>
                                    <span>de {formatCurrency(item.targetAmount)}</span>
                                </div>

                                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                                    <div style={{
                                        width: `${Math.min((item.currentAmount / item.targetAmount) * 100, 100)}%`,
                                        height: '100%',
                                        background: 'var(--accent-gold)',
                                        transition: 'width 0.5s ease'
                                    }} />
                                </div>
                            </div>

                            {expandedGoalId === item.id && (
                                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)', animation: 'fadeIn 0.3s' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                                        <Input
                                            type="number"
                                            placeholder="Monto..."
                                            value={transactionAmount}
                                            onChange={e => setTransactionAmount(e.target.value)}
                                            style={{ marginBottom: 0 }}
                                        />
                                    </div>

                                    {/* Smart Recommendation Button */}
                                    {totalIncome > 0 && (
                                        <div
                                            onClick={() => setTransactionAmount((totalIncome * 0.20).toFixed(0))}
                                            style={{
                                                background: 'rgba(255, 215, 0, 0.1)',
                                                border: '1px dashed var(--accent-gold)',
                                                padding: '8px 12px',
                                                borderRadius: '8px',
                                                marginBottom: '12px',
                                                fontSize: '0.8rem',
                                                color: 'var(--accent-gold)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            <Sparkles size={14} />
                                            <span>Sugerido (20%): {formatCurrency(totalIncome * 0.20)}</span>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <Button onClick={() => handleTransaction(item, 'deposit')} style={{ background: 'var(--accent-green)', flex: 1 }}>
                                            <Plus size={18} /> Depositar
                                        </Button>
                                        <Button onClick={() => handleTransaction(item, 'withdraw')} style={{ background: 'rgba(255,255,255,0.1)', flex: 1 }}>
                                            <Minus size={18} /> Retirar
                                        </Button>
                                        <button onClick={(e) => { e.stopPropagation(); dispatch({ type: 'REMOVE_GOAL', payload: item.id }); }} className="icon-btn danger" style={{ marginLeft: 'auto' }}>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default Goals;
