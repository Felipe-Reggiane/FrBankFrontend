export const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, "");

  return numericValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};

export const formatPhone = (value: string): string => {
  // Remove caracteres não numéricos
  const numericValue = value.replace(/\D/g, "");

  // Aplica a máscara de telefone
  return numericValue
    .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona parênteses nos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o hífen após os cinco primeiros dígitos
    .replace(/(-\d{4})\d+?$/, "$1"); // Limita o número de dígitos após o hífen
};
