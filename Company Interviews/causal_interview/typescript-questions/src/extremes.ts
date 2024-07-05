export type DataItem = {
  label: string;
  values: {
    [key: string]: number;
  };
};

type Extreme = number | undefined;

export const getExtremes = (
  data: DataItem[],
  keys?: string[]
): [Extreme, Extreme] => {
  let min: Extreme;
  let max: Extreme;

  // TODO: calculate min/max from data points nested under `values`
  // if `keys` are defined only include those sets
  // otherwise include all keys under `values`

  return [min, max];
};
