import { byDelta, findLowestCommonValue } from './batchTransactions';

describe('byDelta', () => {
  const batchToArray = (values, maxDelta) =>
    Array.from(byDelta(values, maxDelta));

  it('should batch some simple cases', () => {
    expect(batchToArray([1, 2, 4, 8], 2)).toEqual([[1, 2, 4], [8]]);
    expect(batchToArray([1, 2, 6, 8], 2)).toEqual([[1, 2], [6, 8]]);
    expect(batchToArray([1, 2, 6, 8], 1)).toEqual([[1, 2], [6], [8]]);
  });

  it('should batch some edge cases', () => {
    expect(batchToArray([], 2)).toEqual([]);
    expect(batchToArray([1, 2, 3, 4], 0)).toEqual([[1], [2], [3], [4]]);
    expect(batchToArray([1, 2, 6, 8], -1)).toEqual([[1], [2], [6], [8]]);
    expect(batchToArray([-3, 1, 2, 6, 8], 4)).toEqual([[-3, 1, 2, 6, 8]]);
  });
})

describe('lowestCommonValue', () => {

  it('should find the common value in some simple cases', () => {
    expect(findLowestCommonValue([1], 1, x => x)).toEqual(1);
    expect(findLowestCommonValue([1, 2], 1, x => 1)).toEqual(1);
    expect(findLowestCommonValue([1, 1, 2], 0.5, x => x)).toEqual(1);
    expect(findLowestCommonValue([1, 2, 3], 0, x => 1, x => x)).toEqual(1);
  });

  it('should find the common value in some edge cases', () => {
    expect(findLowestCommonValue([], 1, x => 1)).toEqual(null);
    expect(findLowestCommonValue([1, 2], 1, x => x)).toEqual(null);
    expect(findLowestCommonValue([1, 1, 2, 2, 3], 0.4, x => x)).toEqual(null);
  });

})