import React from 'react';

const Card = ({ children, title, className = '' }) => {
    return (
        <div className={`card ${className}`}>
            {title && <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</h3>}
            {children}
        </div>
    );
};

export default Card;
