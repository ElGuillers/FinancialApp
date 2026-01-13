import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import Card from '../components/Card';
import Input from '../components/Input';
import CurrencyInput from '../components/CurrencyInput';
import Button from '../components/Button';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CATEGORIES, getCategory } from '../utils/categories';
import { Select } from '../components/Input';

const Debts = () => {
    const { state, dispatch } = useFinancial();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        cutoffDate: '',
        categoryId: 'shopping',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.description) return;
        dispatch({ type: 'ADD_DEBT', payload: formData });
        setFormData({ amount: '', description: '', cutoffDate: '', categoryId: 'shopping' });
        setShowForm(false);
    };

    return (
        <div style={{ paddingBottom: '100px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1>Deudas</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-icon-filled" style={{ background: 'var(--accent-red)' }}>
                    <Plus size={24} />
                </button>
            </header>

            {showForm && (
                <Card className="form-card animate-slide-down">
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Deuda"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Ej. Tarjeta de Crédito"
                        />

                        <CurrencyInput
                            label="Monto a pagar"
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="0"
                        />
                        <Input
                            label="Fecha de Corte"
                            type="date"
                            value={formData.cutoffDate}
                            onChange={e => setFormData({ ...formData, cutoffDate: e.target.value })}
                        />
                        <Select
                            label="Categoría"
                            value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                            options={CATEGORIES.filter(c => c.type === 'expense' || c.type === 'both').map(c => ({
                                value: c.id,
                                label: c.label
                            }))}
                        />
                        <Button type="submit" style={{ background: 'var(--accent-red)' }}>Agregar Deuda</Button>
                    </form>
                </Card>
            )}

            <div className="debt-list">
                {state.debts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>¡Libre de deudas!</p>
                ) : (
                    state.debts.map(item => {
                        const CategoryIcon = getCategory(item.categoryId || 'shopping').icon;
                        const categoryColor = getCategory(item.categoryId || 'shopping').color;
                        return (
                            <Card key={item.id} className="list-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                                        <div style={{
                                            background: `${categoryColor}20`,
                                            padding: '10px',
                                            borderRadius: '50%',
                                            color: categoryColor,
                                            height: 'fit-content'
                                        }}>
                                            <CategoryIcon size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', marginBottom: '4px' }}>{item.description}</div>
                                            {item.cutoffDate && (
                                                <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <Calendar size={12} />
                                                    Corte: {formatDate(item.cutoffDate)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ color: 'var(--accent-red)', fontWeight: 'bold', marginBottom: '8px' }}>{formatCurrency(item.amount)}</div>
                                        <button onClick={() => dispatch({ type: 'REMOVE_DEBT', payload: item.id })} className="icon-btn danger">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                )}
            </div>
        </div>
    );
};

export default Debts;
