const dateFormat = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
});

export const formatDate = date => dateFormat.format(new Date(date));

const currencyLookup = {
  'GBP': '£',
  'EUR': '€',
  'USD': '$'
};

export const formatAmount = (currency, amount) => `${currencyLookup[currency] || currency}${(-amount / 100).toFixed(2)}`;
