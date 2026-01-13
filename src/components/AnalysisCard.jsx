import React from 'react';
import Card from './Card';
import { formatCurrency } from '../utils/formatters';
import { PieChart, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const AnalysisCard = ({ monthlyIncome, totalDebt }) => {
    // 50/30/20 Rule
    const needsLimit = monthlyIncome * 0.50;
    const wantsLimit = monthlyIncome * 0.30;
    const savingsTarget = monthlyIncome * 0.20;

    // Analysis
    const debtRatio = (totalDebt / monthlyIncome) * 100;
    const remainingAfterDebt = monthlyIncome - totalDebt;

    // Recommendation Logic
    let recommendation = {
        amount: 0,
        text: '',
        status: 'neutral'
    };

    if (monthlyIncome === 0) {
        recommendation.text = "Agrega tus ingresos para recibir recomendaciones.";
    } else if (remainingAfterDebt < 0) {
        recommendation.text = "Tus deudas superan tus ingresos. Prioriza pagar deudas antes de ahorrar.";
        recommendation.status = 'danger';
        recommendation.amount = 0;
    } else {
        // Ideally save 20%, but constrained by debt
        // If debt takes > 50% (needs), it eats into wants/savings.
        // Let's suggest: Max(0, Min(SavingsTarget, Remaining - MinimalLivingExpenses?))
        // Simplifying: Suggest saving up to 20%, but cap at remaining free cash flow.

        const maxPossibleSavings = remainingAfterDebt;
        const suggestedSavings = Math.min(savingsTarget, maxPossibleSavings);

        if (debtRatio > 50) {
            recommendation.text = `El ${Math.round(debtRatio)}% de tu ingreso va a deudas. Te recomendamos aportar lo que puedas, pero enfócate en liberar flujo de caja.`;
            recommendation.status = 'warning';
            recommendation.amount = suggestedSavings;
        } else {
            recommendation.text = "¡Saludable! Deberías poder destinar el 20% a tus sueños.";
            recommendation.status = 'success';
            recommendation.amount = suggestedSavings;
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'success': return 'var(--accent-green)';
            case 'warning': return 'var(--accent-gold)';
            case 'danger': return 'var(--accent-red)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <Card className="analysis-card" title="Análisis Inteligente (Mensual)">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '12px',
                    borderRadius: '50%',
                    color: getStatusColor(recommendation.status)
                }}>
                    {recommendation.status === 'success' ? <CheckCircle size={24} /> :
                        recommendation.status === 'danger' ? <AlertTriangle size={24} /> :
                            <TrendingUp size={24} />}
                </div>
                <div>
                    <div style={{ fontSize: '0.9rem', marginBottom: '4px', color: 'var(--text-secondary)' }}>Recomendación para Sueños</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>
                        +{formatCurrency(recommendation.amount)}
                    </div>
                </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {recommendation.text}
            </p>

            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Regla 50/30/20 (Ideal)</span>
                    <span>{formatCurrency(monthlyIncome)}</span>
                </div>

                <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '50%', background: 'var(--accent-blue)', opacity: 0.8 }} title="50% Necesidades" />
                    <div style={{ width: '30%', background: 'var(--accent-purple)', opacity: 0.8 }} title="30% Deseos" />
                    <div style={{ width: '20%', background: 'var(--accent-gold)' }} title="20% Ahorro" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    <span>Nec.</span>
                    <span>Deseos</span>
                    <span style={{ color: 'var(--accent-gold)' }}>Ahorro</span>
                </div>
            </div>
        </Card>
    );
};

export default AnalysisCard;
