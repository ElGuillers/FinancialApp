import React, { createContext, useContext, useReducer, useEffect } from 'react';

const FinancialContext = createContext();

const initialState = {
    income: [],
    debts: [],
    goals: [],
};

// Load from local storage
const localState = JSON.parse(localStorage.getItem('financialData'));
const startState = localState || initialState;

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
            newState = { ...state, goals: [...state.goals, { ...action.payload, currentAmount: 0, id: Date.now() }] };
            break;
        case 'UPDATE_GOAL_PROGRESS':
            newState = {
                ...state,
                goals: state.goals.map(goal =>
                    goal.id === action.payload.id ? { ...goal, currentAmount: Number(action.payload.amount) } : goal
                )
            };
            break;
        case 'REMOVE_GOAL':
            newState = { ...state, goals: state.goals.filter(item => item.id !== action.payload) };
            break;
        default:
            return state;
    }
    localStorage.setItem('financialData', JSON.stringify(newState));
    return newState;
};

export const FinancialProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, startState);

    // Calculate totals
    const totalIncome = state.income.reduce((acc, curr) => {
        const amount = Number(curr.amount);
        switch (curr.frequency) {
            case 'daily': return acc + (amount * 30);
            case 'weekly': return acc + (amount * 4);
            case 'biweekly': return acc + (amount * 2);
            case 'semiannual': return acc + (amount / 6);
            default: return acc + amount; // monthly
        }
    }, 0);

    const totalDebt = state.debts.reduce((acc, curr) => acc + Number(curr.amount), 0);
    const totalSavings = state.goals.reduce((acc, curr) => acc + Number(curr.currentAmount), 0);

    return (
        <FinancialContext.Provider value={{ state, dispatch, totalIncome, totalDebt, totalSavings }}>
            {children}
        </FinancialContext.Provider>
    );
};

export const useFinancial = () => useContext(FinancialContext);
