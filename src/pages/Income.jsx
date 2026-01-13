import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import Card from '../components/Card';
import Input, { Select } from '../components/Input';
import CurrencyInput from '../components/CurrencyInput';
import Button from '../components/Button';
import { Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';
import { CATEGORIES, getCategory } from '../utils/categories';

const Income = () => {
    const { state, dispatch } = useFinancial();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        frequency: 'monthly', // default
        categoryId: 'salary',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.amount || !formData.description) return;
        dispatch({ type: 'ADD_INCOME', payload: formData });
        setFormData({ amount: '', description: '', frequency: 'monthly', categoryId: 'salary' });
        setShowForm(false);
    };

    return (
        <div style={{ paddingBottom: '100px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h1>Ingresos</h1>
                <button onClick={() => setShowForm(!showForm)} className="btn-icon-filled" style={{ background: 'var(--accent-green)' }}>
                    <Plus size={24} />
                </button>
            </header>

            {showForm && (
                <Card className="form-card animate-slide-down">
                    <form onSubmit={handleSubmit}>
                        <Input
                            label="Descripción"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Ej. Salario"
                        />

                        <CurrencyInput
                            label="Monto"
                            value={formData.amount}
                            onChange={e => setFormData({ ...formData, amount: e.target.value })}
                            placeholder="0"
                        />
                        <Select
                            label="Frecuencia"
                            value={formData.frequency}
                            onChange={e => setFormData({ ...formData, frequency: e.target.value })}
                            options={[
                                { value: 'daily', label: 'Diario' },
                                { value: 'weekly', label: 'Semanal' },
                                { value: 'biweekly', label: 'Quincenal' },
                                { value: 'monthly', label: 'Mensual' },
                                { value: 'semiannual', label: 'Prima Semestral' },
                                { value: 'occasional', label: 'Ocasional / Otros' },

                            ]}
                        />
                        <Select
                            label="Categoría"
                            value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                            options={CATEGORIES.filter(c => c.type === 'income' || c.type === 'both').map(c => ({
                                value: c.id,
                                label: c.label
                            }))}
                        />
                        <Button type="submit" style={{ background: 'var(--accent-green)' }}>Guardar Ingreso</Button>
                    </form>
                </Card>
            )}

            <div className="income-list">
                {state.income.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '40px' }}>No hay ingresos registrados</p>
                ) : (
                    state.income.map(item => {
                        const CategoryIcon = getCategory(item.categoryId || 'salary').icon;
                        const categoryColor = getCategory(item.categoryId || 'salary').color;
                        return (
                            <Card key={item.id} className="list-item">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            background: `${categoryColor}20`,
                                            padding: '10px',
                                            borderRadius: '50%',
                                            color: categoryColor
                                        }}>
                                            <CategoryIcon size={20} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{item.description}</div>
                                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                                {item.frequency === 'biweekly' ? 'Quincenal' :
                                                    item.frequency === 'monthly' ? 'Mensual' :
                                                        item.frequency === 'weekly' ? 'Semanal' :
                                                            item.frequency === 'semiannual' ? 'Semestral' :
                                                                item.frequency === 'occasional' ? 'Ocasional' : 'Diario'}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                        <span style={{ color: 'var(--accent-green)', fontWeight: 'bold' }}>{formatCurrency(item.amount)}</span>
                                        <button onClick={() => dispatch({ type: 'REMOVE_INCOME', payload: item.id })} className="icon-btn danger">
                                            <Trash2 size={18} />
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

export default Income;
