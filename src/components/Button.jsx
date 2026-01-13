import React from 'react';

const Button = ({ children, onClick, type = 'button', variant = 'primary', style = {} }) => {
    const baseStyle = {
        background: variant === 'primary'
            ? 'linear-gradient(135deg, var(--accent-purple), var(--accent-blue))'
            : 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: 'var(--radius-md)',
        fontWeight: 600,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'opacity 0.2s, transform 0.1s',
        ...style
    };

    return (
        <button
            type={type}
            onClick={onClick}
            style={baseStyle}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            {children}
        </button>
    );
};

export default Button;
