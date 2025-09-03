/**
 * Utility functions for the SCOUT application
 */

/**
 * Get color based on severity level
 */
export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'HIGH': return '#f44336';
    case 'MEDIUM': return '#ff9800';
    case 'CRITICAL': return '#d32f2f';
    default: return '#666';
  }
};

/**
 * Get color based on status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'ACTIVE': return '#f44336';
    case 'ACKNOWLEDGED': return '#ff9800';
    case 'RESOLVED': return '#4caf50';
    default: return '#666';
  }
};

/**
 * Format timestamp to readable format
 */
export const formatTimestamp = (timestamp: string): string => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch (error) {
    return timestamp;
  }
};

/**
 * Calculate compliance percentage
 */
export const calculateComplianceRate = (violations: number, total: number): number => {
  if (total === 0) return 100;
  return Math.max(0, Math.round(((total - violations) / total) * 100));
};

/**
 * Generate unique ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Format number with commas
 */
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

/**
 * Get time ago string
 */
export const getTimeAgo = (timestamp: string): string => {
  const now = new Date().getTime();
  const time = new Date(timestamp).getTime();
  const diff = now - time;
  
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

/**
 * Debounce function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
