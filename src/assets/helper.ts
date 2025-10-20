export const toTitleCase = (str: string) => {
    if (!str) return '';
    // Convert to string and then replace the first letter of every word with its uppercase version.
    return String(str).toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};