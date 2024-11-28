export const calculateSKO = (value) => {
  if (value >= 0 && value <= 1.1) return "1";
  if (value > 1.1 && value <= 1.85) return "2";
  if (value > 1.85 && value <= 2.15) return "3";
  if (value > 2.15 && value <= 2.53) return "4-";
  if (value > 2.53 && value <= 2.99) return "4";
  if (value > 2.99 && value <= 3.8) return "4+";
  if (value > 3.8) return "5";
  return "N/A";
};