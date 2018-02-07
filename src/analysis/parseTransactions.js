const categoryLookup = {
  'eating_out': 'Refreshments',
  'entertainment': 'Other',
  'general': 'Refreshments',
  'groceries': 'Refreshments',
  'holidays': 'Other',
  'transport': 'Transport'
};

export default transactions =>
  transactions.filter(({ merchant }) => merchant != null)
    .filter(({ category }) => category === 'expenses')
    .map(({
      id,
      created,
      settled,
      merchant: { name, address, category },
      amount,
      currency,
      local_amount: localAmount,
      local_currency: localCurrency,
      notes,
      metadata,
      attachments
}) => ({
        id,
        created,
        settled: settled !== '',
        merchant: name,
        address,
        category: categoryLookup[category] || 'Other',
        amount,
        currency,
        localAmount: localCurrency !== currency ? localAmount : null,
        localCurrency: localCurrency !== currency ? localCurrency : null,
        notes,
        metadata,
        attachments
      }));