import { VinInfo } from "../types/Vin";

const isValue = (value: null | string, variable: string) => { 
  return Boolean(value) && !variable.includes('Error');
};

export const filterVinResult = (vinResults: VinInfo[]) => {
  const filteredResults = vinResults.filter(result => isValue(result.value, result.variable));

  return filteredResults;
};
