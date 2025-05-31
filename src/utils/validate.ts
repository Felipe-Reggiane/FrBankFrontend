export const validateCPF = (cpf: string): boolean => {
  if (typeof cpf !== "string") return false;
  const numericCPF = cpf.replace(/\D/g, "");

  if (numericCPF.length !== 11 || /^(\d)\1+$/.test(numericCPF)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(numericCPF[i - 1]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numericCPF[9])) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(numericCPF[i - 1]) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(numericCPF[10])) return false;

  return true;
};
