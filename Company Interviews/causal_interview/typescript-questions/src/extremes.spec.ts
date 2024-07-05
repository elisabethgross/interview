import { DataItem, getExtremes } from './extremes';

const intToChar = (int: number) => String.fromCharCode('a'.charCodeAt(0) + int);

const generateData = (input: Array<number[]>) => {
  let data: DataItem[] = [];

  input.forEach((item, index) => {
    data.push({
      label: `step-${index}`,
      values: item.reduce((ac, a, i) => ({ ...ac, [intToChar(i)]: a }), {}),
    });
  });

  return data;
};

it('gets min max', () => {
  const data = generateData([[1], [2]]);

  expect(getExtremes(data)).toStrictEqual([1, 2]);
});

it('handles empty set', () => {
  const data = [];

  expect(getExtremes(data)).toStrictEqual([undefined, undefined]);
});

it('handles unexpected data points', () => {
  const data = [
    undefined,
    1,
    false,
    null,
    {},
    { values: undefined },
    { values: {} },
  ];

  // @ts-ignore
  expect(getExtremes(data)).toStrictEqual([undefined, undefined]);
});

it('allows for negative values', () => {
  const data = generateData([[-1], [-2]]);

  expect(getExtremes(data)).toStrictEqual([-2, -1]);
});

it('multiple keys', () => {
  const data = generateData([
    [1, 2],
    [3, 4],
  ]);

  expect(getExtremes(data)).toStrictEqual([1, 4]);
});

it('multiple keys of varying length', () => {
  const data = generateData([[3, 2], [6, 5, 4], [1]]);

  expect(getExtremes(data)).toStrictEqual([1, 6]);
});

it('specific key', () => {
  const data = generateData([
    [1, 2],
    [3, 4],
  ]);

  expect(getExtremes(data, ['a'])).toStrictEqual([1, 3]);
});

it('specific keys (multiple)', () => {
  const data = generateData([
    [1, 2],
    [3, 4],
  ]);

  expect(getExtremes(data, ['a', 'b'])).toStrictEqual([1, 4]);
});

it('specific key, missing in some data points', () => {
  const data = generateData([[3, 4], [1], [7], [5, 6]]);

  expect(getExtremes(data, ['b'])).toStrictEqual([4, 6]);
});

it('invalid key, missing in all data points', () => {
  const data = generateData([
    [1, 2],
    [3, 4],
  ]);

  expect(getExtremes(data, ['c'])).toStrictEqual([undefined, undefined]);
});
