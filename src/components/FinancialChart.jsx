import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { formatCurrency } from '../utils/formatters';

const FinancialChart = ({ totalDebt, totalSavings, netBalance }) => {
    // Data definition: ensuring non-negative values for the chart
    const data = [
        { name: 'Deudas', value: Math.max(0, totalDebt), color: '#ef233c' }, // accent-red
        { name: 'Ahorros', value: Math.max(0, totalSavings), color: '#ffd700' }, // accent-gold
        { name: 'Disponible', value: Math.max(0, netBalance), color: '#38b000' }, // accent-green (or purple #7b2cbf)
    ].filter(item => item.value > 0); // Only show segments with value

    if (data.length === 0) {
        return (
            <div style={{
                height: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                fontStyle: 'italic'
            }}>
                No hay datos suficientes para graficar
            </div>
        );
    }

    return (
        <div style={{ height: '250px', width: '100%', fontSize: '0.8rem' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => formatCurrency(value)}
                        contentStyle={{
                            backgroundColor: 'var(--bg-card)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '8px',
                            color: 'var(--text-primary)'
                        }}
                        itemStyle={{ color: 'var(--text-primary)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default FinancialChart;
