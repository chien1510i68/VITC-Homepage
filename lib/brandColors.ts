// Brand Colors Configuration
export const brandColors = {
  // Primary brand colors
  primary: '#00b546',     // Green
  secondary: '#f64c00',   // Orange
  
  // Text colors
  textDark: '#000000',    // Black
  textLight: '#ffffff',   // White
  textGray: '#64748b',    // Slate-500 for secondary text
  textMuted: '#94a3b8',   // Slate-400 for muted text
  
  // Background colors
  bgLight: '#ffffff',     // White background
  bgGray: '#f8fafc',      // Light gray background
  bgDark: '#1e293b',      // Dark background
  
  // Utility colors
  border: '#e2e8f0',      // Light border
  success: '#22c55e',     // Success green
  warning: '#f59e0b',     // Warning yellow
  error: '#ef4444',       // Error red
  
  // Gradients
  gradients: {
    primary: `linear-gradient(135deg, #00b546 0%, #00a63f 100%)`,
    secondary: `linear-gradient(135deg, #f64c00 0%, #e63900 100%)`,
    mixed: `linear-gradient(135deg, #00b546 0%, #f64c00 100%)`,
  }
};

// CSS Variables for Tailwind (if needed)
export const cssVariables = `
  :root {
    --color-primary: 0 181 70;
    --color-secondary: 246 76 0;
    --color-text-dark: 0 0 0;
    --color-text-light: 255 255 255;
  }
`;

export default brandColors;