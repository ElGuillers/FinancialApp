import {
    Utensils, Bus, Home, ShoppingBag, Zap, HeartPulse,
    Briefcase, Gift, Drama, GraduationCap,
    Plane, Smartphone, Wifi, Coffee, MoreHorizontal
} from 'lucide-react';

export const CATEGORIES = [
    { id: 'salary', label: 'Salario', icon: Briefcase, type: 'income', color: '#10b981' },
    { id: 'business', label: 'Negocio', icon: Zap, type: 'income', color: '#f59e0b' },
    { id: 'gift', label: 'Regalo', icon: Gift, type: 'income', color: '#ec4899' },

    { id: 'food', label: 'Comida', icon: Utensils, type: 'expense', color: '#ef4444' },
    { id: 'transport', label: 'Transporte', icon: Bus, type: 'expense', color: '#3b82f6' },
    { id: 'home', label: 'Vivienda', icon: Home, type: 'expense', color: '#8b5cf6' },
    { id: 'utilities', label: 'Servicios', icon: Wifi, type: 'expense', color: '#06b6d4' },
    { id: 'shopping', label: 'Compras', icon: ShoppingBag, type: 'expense', color: '#f43f5e' },
    { id: 'health', label: 'Salud', icon: HeartPulse, type: 'expense', color: '#ef4444' },
    { id: 'education', label: 'Educación', icon: GraduationCap, type: 'expense', color: '#6366f1' },
    { id: 'entertainment', label: 'Entretenimiento', icon: Drama, type: 'expense', color: '#a855f7' },
    { id: 'travel', label: 'Viajes', icon: Plane, type: 'expense', color: '#14b8a6' },
    { id: 'coffee', label: 'Café/Snacks', icon: Coffee, type: 'expense', color: '#d97706' },
    { id: 'tech', label: 'Tecnología', icon: Smartphone, type: 'expense', color: '#64748b' },

    { id: 'other', label: 'Otros', icon: MoreHorizontal, type: 'both', color: '#9ca3af' },
];

export const getCategory = (id) => {
    return CATEGORIES.find(c => c.id === id) || CATEGORIES.find(c => c.id === 'other');
};
