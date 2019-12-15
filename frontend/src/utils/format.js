export const { format: formatPrice } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatMonth = value => {
  if (value > 1) return `${value} meses`;
  return `${value} mês`;
};
