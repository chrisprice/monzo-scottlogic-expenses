import ms from 'ms';
import { countries } from 'country-data';

export function* byDelta(sortedItems, maxDelta, valueSelector = x => x) {
  let batch = [], lastValue;
  for (const item of sortedItems) {
    const value = valueSelector(item);
    if (value - lastValue > maxDelta) {
      yield batch;
      batch = [];
    }
    lastValue = value;
    batch.push(item);
  }
  if (batch.length > 0) {
    yield batch;
  }
};

export const findCommonValue = (values, minPercentage) => {
  const counts = new Map();
  for (const value of values) {
    const count = counts.get(value) || 0;
    counts.set(value, count + 1);
  }
  const qualifyingCount = Math.round(values.length * minPercentage);
  const qualifyingValues = [...counts.keys()]
    .filter(value => counts.get(value) >= qualifyingCount);
  return qualifyingValues.length === 1 ? qualifyingValues[0] : null;
};

export const findLowestCommonValues = (items, minPercentage, ...valueSelectors) =>
  valueSelectors.map(valueSelector => findCommonValue(items.map(valueSelector), minPercentage));

// convert everything over to monzo transactions (but dates)
export default function* (sortedTransactions) {
  for (const transactions of byDelta(sortedTransactions, ms('2d'), transaction => new Date(transaction.created))) {
    const [countryCode, region, city] = findLowestCommonValues(
      transactions,
      0.5,
      tx => tx.address.country,
      tx => tx.address.region,
      tx => tx.address.city
    );
    const { emoji, name: countryName } = countries[countryCode] || { emoji: '❓', name: 'Unknown' };
    yield ({
      emoji,
      description: [city, region, countryName].filter(item => item).join(', '),
      transactions,
      start: transactions[0].created,
      end: transactions[transactions.length - 1].created
    });
  }
};