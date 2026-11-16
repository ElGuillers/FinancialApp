export const formatCurrency = (amount) => {
    const num = Number(amount);
    const validAmount = isNaN(num) ? 0 : num;
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(validAmount);
};

export const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
        // If YYYY-MM-DD from <input type="date">, parse local components to avoid UTC timezone day-shift
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
            const [year, month, day] = dateString.split('-').map(Number);
            const date = new Date(year, month - 1, day);
            return new Intl.DateTimeFormat('es-CO', {
                dateStyle: 'medium',
            }).format(date);
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return new Intl.DateTimeFormat('es-CO', {
            dateStyle: 'medium',
        }).format(date);
    } catch {
        return dateString;
    }
};
