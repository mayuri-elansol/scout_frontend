export const formatDate = (isoString?: string): string => {
  if (!isoString) return '--'; // fallback for undefined/null
  const date = new Date(isoString);
  // Format as DD/MM/YYYY, you can customize
  return date.toLocaleDateString('en-GB');
};
