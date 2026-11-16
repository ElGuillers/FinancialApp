import React, { createContext, useContext, useReducer } from 'react';

const FinancialContext = createContext();

const initialState = {
    income: [],
    debts: [],
    goals: [],
};

const loadInitialState = () => {
    try {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('financialData') : null;
        if (!saved) return initialState;
        const parsed = JSON.parse(saved);
        return {
            income: Array.isArray(parsed?.income) ? parsed.income : [],
            debts: Array.isArray(parsed?.debts) ? parsed.debts : [],
            goals: Array.isArray(parsed?.goals) ? parsed.goals : [],
        };
    } catch (e) {
        console.error('Error loading financialData from localStorage:', e);
        return initialState;
    }
};

const reducer = (state, action) => {
    let newState;
    switch (action.type) {
        case 'ADD_INCOME':
            newState = { ...state, income: [...state.income, { ...action.payload, id: Date.now() }] };
            break;
        case 'REMOVE_INCOME':
            newState = { ...state, income: state.income.filter(item => item.id !== action.payload) };
            break;
        case 'ADD_DEBT':
            newState = { ...state, debts: [...state.debts, { ...action.payload, id: Date.now() }] };
            break;
        case 'REMOVE_DEBT':
            newState = { ...state, debts: state.debts.filter(item => item.id !== action.payload) };
            break;
        case 'ADD_GOAL':
            newState = { ...state, goals: [...state.goals, { currentAmount: 0, ...action.payload, id: Date.now() }] };
            break;
        case 'UPDATE_GOAL_PROGRESS':
            newState = {
                ...state,
                goals: state.goals.map(goal =>
                    goal.id === action.payload.id ? { ...goal, currentAmount: Math.max(0, Number(action.payload.amount) || 0) } : goal
                )
            };
            break;
        case 'REMOVE_GOAL':
            newState = { ...state, goals: state.goals.filter(item => item.id !== action.payload) };
            break;
        default:
            return state;
    }

    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem('financialData', JSON.stringify(newState));
        }
    } catch (e) {
        console.error('Error saving financialData to localStorage:', e);
    }

    return newState;
};

export const FinancialProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, null, loadInitialState);

    // Calculate totals
    const totalIncome = (state.income || []).reduce((acc, curr) => {
        const amount = Number(curr.amount) || 0;
        switch (curr.frequency) {
            case 'daily': return acc + (amount * 30);
            case 'weekly': return acc + (amount * 4);
            case 'biweekly': return acc + (amount * 2);
            case 'semiannual': return acc + (amount / 6);
            case 'occasional': return acc + amount;
            default: return acc + amount; // monthly
        }
    }, 0);

    const totalDebt = (state.debts || []).reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
    const totalSavings = (state.goals || []).reduce((acc, curr) => acc + (Number(curr.currentAmount) || 0), 0);

    return (
        <FinancialContext.Provider value={{ state, dispatch, totalIncome, totalDebt, totalSavings }}>
            {children}
        </FinancialContext.Provider>
    );
};

export const useFinancial = () => useContext(FinancialContext);
