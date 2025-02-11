const formatMoney = (value: number, currency?: string) => {
  const formattedNumber = (Math.round(value * 100) / 100).toFixed(2);
  if (currency) {
    return formattedNumber + " " + currency;
  }

  return formattedNumber;
};

export const NumberUtility = { formatMoney };
