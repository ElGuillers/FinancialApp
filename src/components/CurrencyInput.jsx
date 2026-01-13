import React, { useState, useEffect } from 'react';
import Input from './Input';

const CurrencyInput = ({ value, onChange, ...props }) => {
    // Local state to manage the display value
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
        if (value === '' || value === undefined) {
            setDisplayValue('');
        } else {
            // Format existing value on mount or external update
            setDisplayValue(formatNumber(value));
        }
    }, [value]);

    const formatNumber = (val) => {
        if (!val) return '';
        // Remove existing dots to avoid confusion
        const num = val.toString().replace(/\./g, '');
        // Format with thousands separator using regex to guarantee dots
        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;

        // Remove all non-numeric characters
        const rawValue = inputValue.replace(/\D/g, '');

        if (rawValue === '') {
            onChange({ target: { value: '' } });
            setDisplayValue('');
            return;
        }

        // Pass the raw numeric value to the parent
        onChange({ target: { value: rawValue } });

        // Update display value with formatting
        // We use the rawValue to re-format to ensure consistency
        const formatted = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setDisplayValue(formatted);
    };

    return (
        <Input
            {...props}
            type="text" // Must be text to allow dots
            inputMode="numeric" // Shows numeric keypad on mobile
            value={displayValue}
            onChange={handleChange}
        />
    );
};

export default CurrencyInput;
