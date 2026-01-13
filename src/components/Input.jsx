import React from 'react';

const Input = ({ label, ...props }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{label}</label>}
            <input {...props} />
        </div>
    );
};

export const Select = ({ label, options, ...props }) => {
    return (
        <div style={{ marginBottom: '16px' }}>
            {label && <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{label}</label>}
            <select {...props}>
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
        </div>
    );
};

export default Input;
