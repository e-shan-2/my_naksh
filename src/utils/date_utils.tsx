// src/utils/dateUtils.ts
export function getTodayDate() {
  const date = new Date();
  return date.toISOString().split('T')[0]; // "YYYY-MM-DD"
}
