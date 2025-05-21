export function taxCalculator(price: number): number {
  const taxRate = 0.05; // 5% VAT for UAE
  return price * taxRate;
}
