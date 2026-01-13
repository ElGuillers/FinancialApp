import React from 'react';
import Card from '../components/Card';
import { Lightbulb, TrendingUp, AlertTriangle, PiggyBank } from 'lucide-react';

const Tips = () => {
    const tips = [
        {
            id: 1,
            title: "La Regla 50/30/20",
            icon: TrendingUp,
            color: "var(--accent-blue)",
            content: "Divide tus ingresos: 50% para necesidades, 30% para deseos y 20% para ahorros/deudas. Es un buen punto de partida."
        },
        {
            id: 2,
            title: "Fondo de Emergencia",
            icon: AlertTriangle,
            color: "var(--accent-red)",
            content: "Antes de invertir, ahorra de 3 a 6 meses de gastos básicos. Esto te protegerá de imprevistos sin endeudarte."
        },
        {
            id: 3,
            title: "Automatiza tu Ahorro",
            icon: PiggyBank,
            color: "var(--accent-green)",
            content: "Configura transferencias automáticas a tu cuenta de ahorros el día que recibes tu salario. Ojos que no ven, dinero que se ahorra."
        },
        {
            id: 4,
            title: "Interés Compuesto",
            icon: Lightbulb,
            color: "var(--accent-gold)",
            content: "Invierte temprano. El interés compuesto hace que tu dinero genere más dinero sobre el tiempo. ¡La paciencia paga!"
        }
    ];

    return (
        <div style={{ paddingBottom: '80px' }}>
            <header style={{ marginBottom: '24px' }}>
                <h1>Educación Financiera</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Aprende a dominar tu dinero</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {tips.map(tip => {
                    const Icon = tip.icon;
                    return (
                        <Card key={tip.id} className="animate-slide-up">
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <div style={{
                                    background: `rgba(255,255,255,0.05)`,
                                    borderRadius: '12px',
                                    padding: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 'fit-content'
                                }}>
                                    <Icon size={24} color={tip.color} />
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '8px', fontSize: '1.1rem' }}>{tip.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.4' }}>{tip.content}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default Tips;
